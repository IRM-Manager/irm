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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddYear } from '../../../actions/irm.action';
import { Year } from '../../models/irm';
import { PayeeDialogComponent } from '../../payee-layout/payee-dialog/payee-dialog.component';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { PayeeServiceService } from '../service/payee-service.service';
//

@Component({
  selector: 'app-payee',
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
  templateUrl: './payee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee.component.scss'],
})
export class PayeeComponent implements OnDestroy, OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  genLoading = 0;
  clickEventSubscription?: Subscription;
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  datas2: any;
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  stateYear: Observable<Year[]>;
  htmlYear = new Date().getFullYear();
  years: any;
  totalRecords = 0;
  current_page = 50;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    public shared: ToggleNavService,
    private httpService: HttpService,
    private payeeService: PayeeServiceService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();
    this.stateYear = store.select(selectAllYear);
    //
    this.datas2 = this.payeeService.getMessage();
    if (this.datas2) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    //
    const get_year: any = this.payeeService.getAYearMessage();
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
      return data.assessment_month
        .toLowerCase()
        .startsWith(search.toLowerCase());
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
    const get_year = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.httpService
      .getAuthSingle(
        BaseUrl.list_payee_ass +
          `tin=${this.datas2?.company?.state_tin}&yearId=${
            id || get_year[0]?.id
          }&page=${this.current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.dtTrigger.next;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.authService.checkExpired();
        }
      );
  }

  reload(id?: any) {
    this.is_reload = true;
    const get_year_id = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.httpService
      .getAuthSingle(
        BaseUrl.list_payee_ass +
          `tin=${this.datas2.company?.state_tin}&yearId=${
            id || get_year_id[0]?.id
          }&page=${this.current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.dtTrigger.next;
          this.is_reload = false;
          this.snackBar.open('Loaded', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        () => {
          this.is_reload = false;
          this.authService.checkExpired();
        }
      );
  }

  paginateData(event?: any) {
    this.is_reload = true;
    const get_year_id = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });

    const get_current_page = event?.first + 50;
    this.current_page = get_current_page;

    this.httpService
      .getAuthSingle(
        BaseUrl.list_payee_ass +
          `tin=${this.datas2.company?.state_tin}&yearId=${
            get_year_id[0]?.id
          }&page=${get_current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.dtTrigger.next;
          this.is_reload = false;
          this.snackBar.open('Loaded', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        () => {
          this.is_reload = false;
          this.authService.checkExpired();
        }
      );
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(PayeeDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  edit(data: any) {
    console.log(data);
  }

  view(data: any) {
    this.payeeService.setAssMessage(data);
    this.payeeService.setAYearMessage({ yearId: data.assessment_year });
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/lists-view']);
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
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

  generateBill(id: any) {
    this.genLoading = id;
    this.httpService
      .postData(
        BaseUrl.payee_gen_bill +
          `tin=${this.datas2.company.state_tin}&assessId=${id}`,
        ''
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.openDialog(data.data, 'generate_bill');
          this.genLoading = 0;
        },
        (err) => {
          this.genLoading = 0;
          this.authService.checkExpired();
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

  chooseYear(data: any) {
    this.htmlYear = data.year;
    this.reload(data.id);
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
