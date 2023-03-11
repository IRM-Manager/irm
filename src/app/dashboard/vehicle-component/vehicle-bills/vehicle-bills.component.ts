import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
import { Observable, Subject, Subscription } from 'rxjs';
import { AddYear } from 'src/app/actions/irm.action';
import { AppState, selectAllYear } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { Year } from '../../models/irm';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-bills',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    DataTablesModule,
    MatToolbarModule,
    PaginatorModule,
  ],
  templateUrl: './vehicle-bills.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-bills.component.scss'],
})
export class VehicleBillsComponent implements OnDestroy, OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  clickEventSubscription?: Subscription;
  isLoading = false;
  gen_loading: any[] = [];
  dtOptions: DataTables.Settings = {};
  datas2: any;
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  years: any;
  htmlYear = new Date().getFullYear();
  stateYear: Observable<Year[]>;
  totalRecords = 0;
  current_page = 50;

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
        data.payer?.state_tin.toLowerCase().includes(search.toLowerCase()) ||
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

  renderTable(event?: any) {
    this.isLoading = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };

    const get_current_page = event?.first + 50;
    this.current_page = get_current_page;

    this.httpService
      .getAuthSingle(
        BaseUrl.vehicle_gen_bill + `?page=${get_current_page / 50 || 1}`
      )
      .subscribe(
        (data: any) => {
          this.datas = data?.results;
          this.searchData = data?.results;
          this.totalRecords = data?.count;
          this.isLoading = false;
          console.log(data);
        },
        () => {
          this.isLoading = false;
          this.authService.checkExpired();
        }
      );
  }

  reload(id?: any) {
    this.is_reload = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.vehicle_gen_bill + `?page=${this.current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          this.datas = data?.results;
          this.searchData = data?.results;
          this.totalRecords = data?.count;
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
        () => {
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
            this.years = data?.results;
            this.renderTable();
            this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
          },
          () => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  // delete bill
  deleteBill(data2: any) {
    this.gen_loading.push(data2.id);
    this.httpService
      .deleteData(BaseUrl.vehicle_gen_bill, data2.id + '/')
      .subscribe(
        (data: any) => {
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(data);
          const data_index = this.datas.findIndex((object) => {
            return object.id === data2.id;
          });
          this.datas.splice(data_index, 1);
          this.snackBar.open('Bill Successfully deleted!', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        (err) => {
          this.authService.checkExpired();
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(err);
          this.snackBar.open(
            err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              'An Error Occured!',
            '',
            {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
  }

  openDialog(data: any, data2: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
        data2: data2,
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
