import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { ComPayer } from '../../../models/irm';
import { AppState, selectAllComPayer } from 'src/app/reducers/index';
import { AddComPayer } from '../../../actions/irm.action';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-payee-business-list',
  templateUrl: './payee-business-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-business-list.component.scss']
})
export class PayeeBusinessListComponent implements OnInit {

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

  stateComPayer: Observable<ComPayer[]>;

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
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();
    this.stateComPayer = store.select(selectAllComPayer);
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
        data.company_payer[0].organisation_name
          .toLowerCase()
          .startsWith(search.toLowerCase()) ||
        data.company_payer[0].org_phone
          .toLowerCase()
          .startsWith(search.toLowerCase()) ||
        this.formatDate(data.created_at).startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.isLoading = true;
    this.stateComPayer?.forEach((e) => {
      if (e.length > 0) {
        this.datas = e[0].data;
        this.searchData = e[0].data;
        console.log(e[0].data);
        this.dtTrigger.next;
        this.isLoading = false;
      } else {
        this.httpService.GetPayerList().subscribe(
          (data: any) => {
            if (data.responsecode == '01') {
            } else {
              const company = data.filter((type: any) => {
                return type.payer_type == 'company';
              });
              this.store.dispatch(new AddComPayer([{ id: 1, data: company }]));
              this.datas = company;
              this.searchData = company;
              this.dtTrigger.next;
              this.isLoading = false;
            }
          },
          (err) => {
            this.isLoading = false;
            this.authService.checkExpired();
          }
        );
      }
    });
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

  OpenDialog(data: any) {
    this.snackBar.dismiss();
    this.dialog.open(DialogComponent, {
      data: {
        type: 'ind',
        data: data,
      },
    });
  }

  goToPayee() {
    this.router.navigate(['/dashboard3/taxpayer/payee'])
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
