import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { AddYear } from '../../../actions/irm.action';
import { Year } from '../../models/irm';
//
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { DialogComponent } from '../../dialog/dialog.component';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-manage-employee',
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
  templateUrl: './payee-manage-employee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-manage-employee.component.scss'],
})
export class PayeeManageEmployeeComponent implements OnDestroy, OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  clickEventSubscription?: Subscription;
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  datas2: any;
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  years: any;
  stateYear: Observable<Year[]>;
  htmlYear = new Date().getFullYear();
  totalRecords = 0;
  current_page = 50;

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
    private payeeService: PayeeServiceService
  ) {
    this.authService.checkExpired();
    this.stateYear = store.select(selectAllYear);

    this.datas2 = this.payeeService.getMessage();
    if (this.datas2) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    //
    const get_year: any = this.payeeService.getAsYearMessage();
    this.htmlYear = get_year?.yearId || new Date().getFullYear();
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
        data.employeeTin.toLowerCase().includes(search.toLowerCase()) ||
        data.employee.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable(id?: any) {
    this.isLoading = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.httpService
      .getAuthSingle(
        BaseUrl.list_registered_employees +
          `comp_tin=${this.datas2?.company?.state_tin}&yearId=${
            id || getHtmlYear[0]?.id
          }&page=${this.current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
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
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.is_reload = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.list_registered_employees +
          `comp_tin=${this.datas2?.company?.state_tin}&yearId=${
            id || getHtmlYear[0]?.id
          }&page=${this.current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.is_reload = false;
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

  paginateData(event?: any) {
    this.is_reload = true;
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });

    const get_current_page = event?.first + 50;
    this.current_page = get_current_page;

    this.httpService
      .getAuthSingle(
        BaseUrl.list_registered_employees +
          `comp_tin=${this.datas2?.company?.state_tin}&yearId=${
            getHtmlYear[0]?.id
          }&page=${get_current_page / 50 || 1}`
      )
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.is_reload = false;
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

  edit(data: any) {
    const pastData = {
      type: 'update',
      data: data,
    };
    this.payeeService.setManualMessage(pastData);
    this.payeeService.setAsYearMessage({ yearId: data.taxYear });
    this.router.navigate(['dashboard/dashboard3/taxpayer/payee/manual/add']);
  }

  openDialog(type: string) {
    this.snackBar.dismiss();
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: this.datas2,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.reload) {
        this.reload(result.year);
      }
    });
  }

  openDDialog(data: any, type: string) {
    this.snackBar.dismiss();
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
    // after dialog close
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.id) {
        // update search data

        this.searchData.filter((dat: any, index: any) => {
          if (dat.id == result.id) {
            this.searchData.splice(index, 1);
          }
        });

        // update table data
        this.datas.filter((dat: any, index: any) => {
          if (dat.id == result.id) {
            this.datas.splice(index, 1);
          }
        });
      }
    });
  }

  goToView(data: any) {
    const pastData = {
      type: 'update',
      data: data,
    };
    this.payeeService.setManualMessage(pastData);
    this.payeeService.setAsYearMessage({ yearId: data.taxYear });
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/manage-edit']);
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
          () => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  chooseYear(year: any) {
    this.htmlYear = year.year;
    this.reload(year.id);
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
    //
    this.clickEventSubscription = this.payeeService
      .getAsClickEvent()
      .subscribe((data: any) => {
        const get_year: any = this.payeeService.getAsYearMessage();
        this.htmlYear = get_year?.yearId || new Date().getFullYear();
        this.renderTable();
      });
    //
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
