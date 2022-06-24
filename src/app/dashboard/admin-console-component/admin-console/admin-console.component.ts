import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllUser } from 'src/app/reducers/index';
import { AddUser } from '../../../actions/irm.action';
import { User } from '../../models/irm';
//
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AdminServiceService } from '../service/admin-service.service';
import { AdminConsoleDialogComponent } from '../admin-console-dialog/admin-console-dialog.component';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./admin-console.component.scss'],
})
export class AdminConsoleComponent implements OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  clickEventSubscription?: Subscription;
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  stateComPayer: Observable<User[]>;
  formErrors: any = {};
  validationMessages: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    public shared: ToggleNavService,
    private httpService: HttpService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private service: AdminServiceService
  ) {
    this.authService.checkExpired();
    this.stateComPayer = store.select(selectAllUser);
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
        data.username.toLowerCase().startsWith(search.toLowerCase()) ||
        data.first_name.toLowerCase().startsWith(search.toLowerCase()) ||
        data.phone.toLowerCase().startsWith(search.toLowerCase()) ||
        data.last_name.toLowerCase().startsWith(search.toLowerCase()) ||
        data.email.toLowerCase().startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
    };
    this.isLoading = true;
    this.httpService.getAuthSingle(BaseUrl.list_user + '1').subscribe(
      (data: any) => {
        this.datas = data.results;
        this.searchData = data.results;
        this.dtTrigger.next;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.authService.checkExpired();
      }
    );
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  Reload() {
    this.is_reload = true;
    this.renderTable();
    this.is_reload = false;
  }

  reload2() {
    this.is_reload = true;
    this.httpService.getAuthSingle(BaseUrl.list_user + '1').subscribe(
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

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    const dialogRef = this.dialog.open(AdminConsoleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
    // after dialog close
    dialogRef.afterClosed().subscribe((result) => {
      // update search data
      let indexx: any;
      this.searchData.filter((dat: any, index: any) => {
        if (dat.id == result.id) {
          indexx = index;
        }
      });
      this.searchData[indexx].is_active = result.active ? false : true;
      // update table data
      let index2: any;
      this.datas.filter((dat: any, index: any) => {
        if (dat.id == result.id) {
          index2 = index;
        }
      });
      this.datas[index2].is_active = result.active ? false : true;
      this.dtTrigger.next;
    });
  }

  goToPayee() {
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee']);
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
