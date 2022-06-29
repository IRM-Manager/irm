import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { PayeeDialogComponent } from '../../payee-layout/payee-dialog/payee-dialog.component';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { PayeeServiceService } from '../service/payee-service.service';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { AddYear } from '../../../actions/irm.action';
import { Year } from '../../models/irm';
//

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee.component.scss'],
})
export class PayeeComponent implements OnDestroy, OnInit {
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
  stateYear: Observable<Year[]>;
  htmlYear = new Date().getFullYear();
  years: any;

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
      return (
        data.assessment_month.toLowerCase().startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable(id?: any) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info : false
    };
    const get_year = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.isLoading = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.list_payee_ass +
          `tin=${this.datas2.tin}&yearId=${id || get_year[0]?.id}`
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datas = data.results;
          this.searchData = data.results;
          this.dtTrigger.next;
          this.isLoading = false;
        },
        (err) => {
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
          `tin=${this.datas2.tin}&yearId=${id || get_year_id[0]?.id}`
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datas = data.results;
          this.searchData = data.results;
          this.dtTrigger.next;
          this.is_reload = false;
          this.snackBar.open('Loaded', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        (err) => {
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
