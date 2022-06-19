import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllComPayer } from 'src/app/reducers/index';
import { BaseUrl } from 'src/environments/environment';
import { AddComPayer } from '../../../actions/irm.action';
import { ComPayer } from '../../models/irm';
//
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';

@Component({
  selector: 'app-direct-history',
  templateUrl: './direct-history.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-history.component.scss'],
})
export class DirectHistoryComponent implements OnInit {
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
        this.httpService.getAuthSingle(BaseUrl.list_com_payer).subscribe(
          (data: any) => {
            this.store.dispatch(new AddComPayer([{ id: 1, data: data.data }]));
            this.datas = data.data;
            this.searchData = data.data;
            this.dtTrigger.next;
            this.isLoading = false;
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

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  redirectToView(data: any, type: string) {
    this.router.navigate(['/dashboard/dashboard5/direct/history/view'])
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
