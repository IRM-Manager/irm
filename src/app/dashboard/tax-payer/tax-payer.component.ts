import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// state management
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  AppState,
  selectAllComPayer,
  selectAllIndPayer,
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddComPayer, AddIndPayer } from '../../actions/irm.action';
import { ComPayer, IndPayer } from '../models/irm';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-tax-payer',
  templateUrl: './tax-payer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./tax-payer.component.scss'],
})
export class TaxPayerComponent implements OnDestroy, OnInit {
  search: string = '';
  active: any = 'ind';
  left_text!: string;
  is_reload = false;
  isLoading = false;

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  searchData2: any;
  dtTrigger: Subject<any> = new Subject<any>();

  stateIndPayer: Observable<IndPayer[]>;
  stateComPayer: Observable<ComPayer[]>;

  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();

  constructor(
    private router: Router,
    private direct: ActivatedRoute,
    private store: Store<AppState>,
    private authService: AuthService,
    private httpService: HttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();

    this.direct.paramMap.subscribe((params) => {
      if (
        params.get('id') === '' ||
        params.get('id') === undefined ||
        params.get('id') === null
      ) {
        this.active = 'ind';
        this.left_text = 'Tax Registration of Individuals';
      } else if (params.get('id') == 'non') {
        this.active = 'com';
        this.left_text = 'Tax Registration of Business';
      } else if (params.get('id') == 'ind') {
        this.active = 'ind';
        this.left_text = 'Tax Registration of Individuals';
      } else {
        this.active = 'ind';
        this.left_text = 'Tax Registration of Individuals';
      }
      this.renderTable();
    });

    this.stateIndPayer = store.select(selectAllIndPayer);
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
    if (this.active == 'com') {
      const data = this.searchData2?.filter((data: any) => {
        return (
          data.tin.toLowerCase().startsWith(search.toLowerCase()) ||
          data.organisation_name
            .toLowerCase()
            .startsWith(search.toLowerCase()) ||
          data.phone.toLowerCase().startsWith(search.toLowerCase()) ||
          this.formatDate(data?.created_at).startsWith(search.toLowerCase())
        );
      });
      this.datas = data;
    } else {
      const data = this.searchData?.filter((data: any) => {
        return (
          data.tin.toLowerCase().startsWith(search.toLowerCase()) ||
          data.profession_trade
            .toLowerCase()
            .startsWith(search.toLowerCase()) ||
          data.phone.toLowerCase().startsWith(search.toLowerCase()) ||
          data.first_name.startsWith(search.toLowerCase()) ||
          data.surname.toLowerCase().startsWith(search.toLowerCase()) ||
          data.middle_name.toLowerCase().startsWith(search.toLowerCase()) ||
          this.formatDate(data?.created_at).startsWith(search.toLowerCase())
        );
      });
      this.datas = data;
    }
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    if (this.active == 'com') {
      this.isLoading = true;
      this.stateComPayer?.forEach((e) => {
        if (e.length > 0) {
          this.datas = e[0].data;
          this.searchData2 = e[0].data;
          console.log(e[0].data);
          this.dtTrigger.next;
          this.isLoading = false;
        } else {
          this.httpService.GetPayerList('companypayers').subscribe(
            (data: any) => {
              console.log(data);
              this.store.dispatch(
                new AddComPayer([{ id: 1, data: data.data }])
              );
              this.datas = data.data;
              this.searchData2 = data.data;
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
    } else {
      this.isLoading = true;
      this.stateIndPayer?.forEach((e) => {
        if (e.length > 0) {
          this.datas = e[0].data;
          this.searchData = e[0].data;
          console.log(e[0].data);
          this.dtTrigger.next;
          this.isLoading = false;
        } else {
          this.httpService.GetPayerList('individualpayers').subscribe(
            (data: any) => {
              this.store.dispatch(
                new AddIndPayer([{ id: 1, data: data.data }])
              );
              this.datas = data.data;
              this.searchData = data.data;
              this.dtTrigger.next;
              this.isLoading = false;
            },
            (err) => {
              this.isLoading = false;
            }
          );
        }
      });
    }
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

  changeActive(type: string) {
    this.active = type;
    if (type == 'com') {
      this.left_text = 'Tax Registration of Business';
      this.router.navigate(['/dashboard/dashboard2/taxpayer/non']);
    } else {
      this.left_text = 'Tax Registration of Individuals';
      this.router.navigate(['/dashboard/dashboard2/taxpayer/ind']);
    }
    this.renderTable();
  }

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
