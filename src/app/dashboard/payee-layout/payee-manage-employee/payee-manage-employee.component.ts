import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// state management
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { Year } from '../../models/irm';
import { AddYear } from '../../../actions/irm.action';
// 
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { DialogComponent } from '../../dialog/dialog.component';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-manage-employee',
  templateUrl: './payee-manage-employee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-manage-employee.component.scss'],
})
export class PayeeManageEmployeeComponent implements OnInit {
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
  selectedYear!: number;
  stateYear: Observable<Year[]>;
  htmlYear = new Date().getFullYear();

  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();

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
    //
    this.datas2 = this.payeeService.getMessage();
    if (this.datas2) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
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
        data.employeeTin.toLowerCase().startsWith(search.toLowerCase()) ||
        data.employee.toLowerCase().startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable(id?: any) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
    };
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.id == id;
    });
    this.htmlYear = getHtmlYear[0]?.year || new Date().getFullYear();
    this.isLoading = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.list_registered_employees +
          `comp_tin=${this.datas2.tin}&yearId=${id}`
      )
      .subscribe(
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

  reload(id?: any) {
    this.is_reload = true;
    const filterYear = this.years?.filter((name: any) => {
      return name.year == new Date().getFullYear();
    });
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.id == id;
    });
    this.htmlYear =
      getHtmlYear[0]?.year || filterYear[0]?.year || new Date().getFullYear();
    this.renderTable(id || filterYear[0].id);
    this.is_reload = false;
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

  goToEdit() {
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/manage-edit']);
  }

  listYear() {
    this.stateYear?.forEach((e) => {
      if (e.length > 0) {
        this.years = e[0].data;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
            this.years = data.results;
          },
          (err) => {
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
    this.reload(year.id);
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    const filterYear = this.years?.filter((name: any) => {
      return name.year == new Date().getFullYear();
    });
    this.renderTable(filterYear[0].id);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
