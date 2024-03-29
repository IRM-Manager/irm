import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllUser } from 'src/app/reducers/index';
import { User } from '../../models/irm';
//
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AdminConsoleDialogComponent } from '../admin-console-dialog/admin-console-dialog.component';
import { AdminServiceService } from '../service/admin-service.service';

@Component({
  selector: 'app-admin-console',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    DataTablesModule,
    MatMenuModule,
    MatToolbarModule,
    PaginatorModule,
  ],
  templateUrl: './admin-console.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./admin-console.component.scss'],
})
export class AdminConsoleComponent implements OnInit, OnDestroy {
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
  stateComPayer: Observable<User[]>;
  formErrors: any = {};
  validationMessages: any = {};
  totalRecords = 0;
  current_page = 50;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    public shared: ToggleNavService,
    private httpService: HttpService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private service: AdminServiceService
  ) {
    this.authService.checkExpired();
    this.stateComPayer = store.select(selectAllUser);
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
        data.username.toLowerCase().includes(search.toLowerCase()) ||
        data.first_name.toLowerCase().includes(search.toLowerCase()) ||
        data.phone.toLowerCase().includes(search.toLowerCase()) ||
        data.last_name.toLowerCase().includes(search.toLowerCase()) ||
        data.email.toLowerCase().includes(search.toLowerCase())
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
      .getAuthSingle(BaseUrl.list_user + `${get_current_page / 50 || 1}`)
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          console.log(data.results);
          this.dtTrigger.next;
          this.isLoading = false;
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

  Reload() {
    this.is_reload = true;
    this.renderTable();
    this.is_reload = false;
  }

  reload2() {
    this.is_reload = true;
    this.httpService
      .getAuthSingle(BaseUrl.list_user + `${this.current_page / 50}`)
      .subscribe(
        (data: any) => {
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

  redirectData(data: any, type: string) {
    const datas = {
      type: type,
      data: data,
    };
    this.service.setAdminMessage(datas);
    this.router.navigate([`/dashboard/dashboard5/${type}`]);
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    const dialogRef = this.dialog.open(AdminConsoleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
    // after dialog close
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // update search data
        let indexx: any;
        this.searchData.filter((dat: any, index: any) => {
          if (dat.id == result.id) {
            indexx = index;
          }
        });
        this.searchData[indexx].is_active = result.active ? false : true;
        // update table data
        let index2: any;
        this.datas.filter((dat: any, index: any) => {
          if (dat.id == result.id) {
            index2 = index;
          }
        });
        this.datas[index2].is_active = result.active ? false : true;
        this.dtTrigger.next;
      }
    });
  }

  goToPayee() {
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee']);
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
