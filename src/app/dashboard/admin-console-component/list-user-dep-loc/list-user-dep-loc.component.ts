import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
//
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AdminConsoleDialogComponent } from '../admin-console-dialog/admin-console-dialog.component';
import { AdminServiceService } from '../service/admin-service.service';

@Component({
  selector: 'app-list-user-dep-loc',
  templateUrl: './list-user-dep-loc.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./list-user-dep-loc.component.scss'],
})
export class ListUserDepLocComponent implements OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  datas2: any;
  clickEventSubscription?: Subscription;
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  formErrors: any = {};
  validationMessages: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    public shared: ToggleNavService,
    private snackBar: MatSnackBar,
    private service: AdminServiceService,
    private _location: Location,
    private httpService: HttpService
  ) {
    this.authService.checkExpired();
    //
    this.datas2 = this.service.getDepLocMessage();
  }

  formatDate(data: any) {
    var d = new Date(data),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  modelChange(search: any) {
    const data = this.searchData?.filter((data: any) => {
      return (
        data.username.toLowerCase().includes(search.toLowerCase()) ||
        data.first_name.toLowerCase().includes(search.toLowerCase()) ||
        data.phone.toLowerCase().includes(search.toLowerCase()) ||
        data.last_name.toLowerCase().includes(search.toLowerCase()) ||
        data.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };
    this.isLoading = true;
    if (this.datas2?.data) {
      this.datas = this.datas2.data;
      this.searchData = this.datas2.data;
      this.dtTrigger.next;
      this.isLoading = false;
    } else {
      this._location.back();
    }
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  reload() {
    this.is_reload = true;
    this.httpService
      .getAuthSingleID(
        this.datas2.location
          ? BaseUrl.get_user_location
          : BaseUrl.get_user_department,
        this.datas2.location
          ? this.datas2.location.id
          : this.datas2.department.id
      )
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.dtTrigger.next;
          this.is_reload = false;
          this.snackBar.open('Loaded', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        (err) => {
          this.is_reload = false;
          this.authService.checkExpired();
        }
      );
  }

  redirectData(data: any, type: string) {
    const datas = {
      type: type,
      data: data,
    };
    this.service.setAdminMessage(datas);
    this.router.navigate([`/dashboard/dashboard5/${type}`]);
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(AdminConsoleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  back() {
    this._location.back();
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
