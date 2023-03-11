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
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-profilling-table',
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
    PaginatorModule,
  ],
  templateUrl: './vehicle-profilling-table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-profilling-table.component.scss'],
})
export class VehicleProfillingTableComponent implements OnDestroy, OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  clickEventSubscription?: Subscription;
  isLoading = false;
  stat: any;
  total_count: number = 0;
  active_page: number = 0;
  totalRecords = 0;
  current_page = 50;
  dtOptions: DataTables.Settings = {};
  datas2: any;
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();

  formErrors: any = {};
  validationMessages: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private service: VehicleServiceService
  ) {
    this.authService.checkExpired();
    //
    this.stat = this.service.getPlateStat();
    if (this.stat) {
    } else {
      this.plateStat();
    }
    //
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
        data?.name.toLowerCase().includes(search.toLowerCase()) ||
        data?.vehicle_usage.toLowerCase().includes(search.toLowerCase()) ||
        this.formatDate(data?.created_at).includes(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable(event?: any) {
    this.isLoading = true;
    this.plateStat();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };

    const get_current_page = event?.first + 50;
    this.current_page = get_current_page;

    this.httpService
      .getAuthSingle(
        BaseUrl.vehicle_profile + `/?page=${get_current_page / 50 || 1}`
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

  reload() {
    this.is_reload = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.vehicle_profile + `/?page=${this.current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.is_reload = false;
          this.isLoading = false;
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

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  chooseYear() {
    this.reload();
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  edit(data: any) {
    const setData = {
      type: 'edit',
      data: data,
    };
    this.service.setProfileMessage(setData);
    this.router.navigate([
      '/dashboard/dashboard5/vehicle/profilling/configure/create',
    ]);
  }

  view(data: any) {
    const setData = {
      type: 'view',
      data: data,
    };
    this.service.setProfileMessage(setData);
    this.router.navigate([
      '/dashboard/dashboard5/vehicle/profilling/configure',
    ]);
  }

  plateStat() {
    this.httpService.getAuthSingle(BaseUrl.vehicle_plate_stat).subscribe(
      (data: any) => {
        console.log(data);
        this.stat = data.data;
        this.service.setPlateStat(data.data);
      },
      (err) => {
        this.authService.checkExpired();
        console.log(err);
      }
    );
  }

  limit(title2: any, limit = 4) {
    let title = title2.toString();
    if (title === undefined) {
      return '';
    } else {
      const newTitle: any = [];
      if (title.length > limit) {
        title.split('').reduce((acc: any, cur: any) => {
          if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
          return acc + cur.length;
        }, 0);
        return `${newTitle.join('')}+`;
      }
      return title;
    }
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
