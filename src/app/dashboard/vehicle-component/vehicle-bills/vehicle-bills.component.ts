import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AddYear } from 'src/app/actions/irm.action';
import { AppState, selectAllYear } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { Year } from '../../models/irm';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-bills',
  templateUrl: './vehicle-bills.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-bills.component.scss'],
})
export class VehicleBillsComponent implements OnInit {
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

  years: any;
  htmlYear = new Date().getFullYear();

  stateYear: Observable<Year[]>;

  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();

  formErrors: any = {};

  validationMessages: any = {};

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();
    this.stateYear = store.select(selectAllYear);
    //
    // const get_year: any = this.service.getAYearMessage();
    // this.htmlYear = get_year?.yearId || new Date().getFullYear();
    //
    this.listYear();
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
        data.assessment?.assess_code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
          data.payer?.state_tin
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        data.payer?.taxpayer_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        data.bill_code.toLowerCase().includes(search.toLowerCase()) ||
        this.formatDate(data?.assessment?.assessment_date).includes(
          search.toLowerCase()
        )
      );
    });
    this.datas = data;
  }

  renderTable(id?: any) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };
    this.isLoading = true;
    this.httpService.getAuthSingle(BaseUrl.vehicle_gen_bill).subscribe(
      (data: any) => {
        this.datas = data.data;
        this.searchData = data.data;
        this.isLoading = false;
        console.log(data);
      },
      (err) => {
        this.isLoading = false;
        this.authService.checkExpired();
      }
    );
  }

  reload(id?: any) {
    this.is_reload = true;
    this.httpService.getAuthSingle(BaseUrl.vehicle_gen_bill).subscribe(
      (data: any) => {
        this.datas = data.data;
        this.searchData = data.data;
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

  listYear() {
    this.stateYear?.forEach((e) => {
      if (e.length > 0) {
        this.years = e[0].data;
        this.renderTable();
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            this.years = data.results;
            this.renderTable();
            this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
          },
          (err) => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  chooseYear(year: any) {
    this.htmlYear = year.year;
    this.reload(year.id);
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
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
