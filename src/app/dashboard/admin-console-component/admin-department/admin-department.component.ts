import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllDepartment } from 'src/app/reducers/index';
import { AddDepartment } from '../../../actions/irm.action';
import { Department } from '../../models/irm';
//
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-admin-department',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    DataTablesModule,
    MatMenuModule,
    MatToolbarModule,
    PaginatorModule,
  ],
  templateUrl: './admin-department.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./admin-department.component.scss'],
})
export class AdminDepartmentComponent implements OnDestroy, OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  getLoding = 0;
  clickEventSubscription?: Subscription;
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  stateDepartment: Observable<Department[]>;
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
    this.stateDepartment = store.select(selectAllDepartment);
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
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.code.toLowerCase().includes(search.toLowerCase())
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

    this.stateDepartment?.forEach((e) => {
      if (e.length > 0) {
        this.datas = e[0].data;
        this.searchData = e[0].data;
        console.log(e[0].data);
        this.dtTrigger.next;
        this.isLoading = false;
      } else {
        this.httpService
          .getAuthSingle(
            BaseUrl.list_department + `?page=${get_current_page / 50 || 1}`
          )
          .subscribe(
            (data: any) => {
              this.store.dispatch(
                new AddDepartment([{ id: 1, data: data.results }])
              );
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
    });
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  reload2() {
    this.is_reload = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.list_department + `?page=${this.current_page / 50}`
      )
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
        (err) => {
          this.is_reload = false;
          this.authService.checkExpired();
        }
      );
  }

  getAssignUsers(data_type: any, id: number) {
    this.getLoding = id;
    this.httpService.getAuthSingleID(BaseUrl.get_user_department, id).subscribe(
      (data: any) => {
        const datas = {
          department: data_type,
          data: data.results,
          location: undefined,
        };
        this.service.setDepLocMessage(datas);
        this.router.navigate(['/dashboard/dashboard5/dep-loc']);
        this.getLoding = 0;
      },
      (err) => {
        this.getLoding = 0;
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
    this.dialog.open(AdminConsoleDialogComponent, {
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
