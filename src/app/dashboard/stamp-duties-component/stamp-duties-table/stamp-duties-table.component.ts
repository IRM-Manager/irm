import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { StampServiceService } from '../service/stamp-service.service';
import { StampDutiesDialogComponent } from '../stamp-duties-dialog/stamp-duties-dialog.component';

@Component({
  selector: 'app-stamp-duties-table',
  templateUrl: './stamp-duties-table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./stamp-duties-table.component.scss'],
})
export class StampDutiesTableComponent implements OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  clickEventSubscription?: Subscription;
  isLoading = false;

  dtOptions: DataTables.Settings = {};
  datas2: any;
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();

  formErrors: any = {};

  validationMessages: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private service: StampServiceService
  ) {
    this.authService.checkExpired();
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
        data.tin.toLowerCase().startsWith(search.toLowerCase()) ||
        data.organisation_name.toLowerCase().startsWith(search.toLowerCase()) ||
        data.phone.toLowerCase().startsWith(search.toLowerCase()) ||
        this.formatDate(data?.created_at).startsWith(search.toLowerCase())
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
    this.httpService.getAuthSingle(BaseUrl.vehicle_plateno).subscribe(
      (data: any) => {
        this.datas = data.results;
        this.searchData = data.results;
        this.isLoading = false;
        console.log(data);
      },
      (err) => {
        this.isLoading = false;
        this.authService.checkExpired();
      }
    );
  }

  reload() {
    this.is_reload = true;
    this.httpService.getAuthSingle(BaseUrl.vehicle_plateno).subscribe(
      (data: any) => {
        this.datas = data.results;
        this.searchData = data.results;
        this.is_reload = false;
        this.isLoading = false;
        this.snackBar.open('Loaded', '', {
          duration: 3000,
          panelClass: 'success',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log(data);
      },
      (err) => {
        this.is_reload = false;
        this.authService.checkExpired();
      }
    );
  }

  viewAss(data: any) {
    // this.service.setviewSelfMessage(data);
    // this.service.setAYearMessage({
    //   yearId: data.assessment.assessment_year || this.htmlYear,
    // });
    this.router.navigate(['/dashboard/dashboard3/stamp/view']);
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(StampDutiesDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  edit(data: any) {
    const setData = {
      update: true,
      data: data,
    };
    // this.service.setMessage(setData);
    // this.service.setAYearMessage({
    //   yearId: data.assessment.assessment_year || this.htmlYear,
    // });
    // this.router.navigate(['/dashboard/dashboard5/direct/self/create']);
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
