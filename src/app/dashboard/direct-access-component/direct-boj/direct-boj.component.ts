import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaginatorModule } from 'primeng/paginator';
import { Observable, Subject, Subscription } from 'rxjs';
import { AddYear } from 'src/app/actions/irm.action';
import { AppState, selectAllYear } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { Year } from '../../models/irm';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';
import { DirectServiceService } from '../service/direct-service.service';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-direct-boj',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    DataTablesModule,
    PaginatorModule,
  ],
  templateUrl: './direct-boj.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-boj.component.scss'],
})
export class DirectBojComponent implements OnDestroy, OnInit {
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
    private service: DirectServiceService
  ) {
    this.authService.checkExpired();
    this.stateYear = store.select(selectAllYear);
    //
    const get_year: any = this.service.getAYearMessage();
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
        data.tin.toLowerCase().includes(search.toLowerCase()) ||
        data.organisation_name.toLowerCase().includes(search.toLowerCase()) ||
        data.phone.toLowerCase().includes(search.toLowerCase()) ||
        this.formatDate(data?.created_at).includes(search.toLowerCase())
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
    const getHtmlYear = this.years?.filter((name: any) => {
      return name.year == this.htmlYear;
    });
    this.isLoading = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.list_boj +
          `?yearId=${id || getHtmlYear[0]?.id}&page=${this.current_page / 50}`
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
        BaseUrl.list_boj +
          `?yearId=${id || getHtmlYear[0]?.id}&page=${this.current_page / 50}`
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
        BaseUrl.list_boj +
          `?yearId=${getHtmlYear[0]?.id}&page=${get_current_page / 50 || 1}`
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

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  viewAss(data: any) {
    this.service.setviewSelfMessage(data);
    this.service.setBYearMessage({
      yearId: data.assessment.assessment_year || this.htmlYear,
    });
    this.router.navigate(['/dashboard/dashboard5/direct/history/view']);
  }

  edit(data: any) {
    const setData = {
      update: true,
      data: data,
    };
    this.service.setMessage(setData);
    this.service.setBYearMessage({
      yearId: data.assessment.assessment_year || this.htmlYear,
    });
    this.router.navigate(['/dashboard/dashboard5/direct/boj/create']);
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
