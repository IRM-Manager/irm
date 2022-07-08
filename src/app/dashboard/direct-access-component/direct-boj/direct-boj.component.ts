import {
  Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observable, Subject, Subscription } from 'rxjs';
import { AddYear } from 'src/app/actions/irm.action';
import { AppState, selectAllYear } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { Year } from '../../models/irm';
import { PayeeDialogComponent } from '../../payee-layout/payee-dialog/payee-dialog.component';
import { PayeeServiceService } from '../../payee-layout/service/payee-service.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-direct-boj',
  templateUrl: './direct-boj.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-boj.component.scss'],
})
export class DirectBojComponent implements OnInit {
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
    private router: Router,
    private direct: ActivatedRoute,
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

    this.htmlYear = new Date().getFullYear();
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
        data.tin.toLowerCase().startsWith(search.toLowerCase()) ||
        data.organisation_name.toLowerCase().startsWith(search.toLowerCase()) ||
        data.phone.toLowerCase().startsWith(search.toLowerCase()) ||
        this.formatDate(data?.created_at).startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable(id?: any) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      info: false,
    };
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.isLoading = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.payee_gen_bill +
          `tin=${this.datas2.company.state_tin}&yearId=${
            id || getHtmlYear[0]?.id
          }`
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

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  reload(id?: any) {
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.is_reload = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.payee_gen_bill +
          `tin=${this.datas2.company.state_tin}&yearId=${
            id || getHtmlYear[0]?.id
          }`
      )
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.is_reload = false;
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
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            this.years = data.results;
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
    this.dialog.open(PayeeDialogComponent, {
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
