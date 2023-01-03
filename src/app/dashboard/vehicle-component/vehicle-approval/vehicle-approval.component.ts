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
import { Store } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-approval',
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
  ],
  templateUrl: './vehicle-approval.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-approval.component.scss'],
})
export class VehicleApprovalComponent implements OnInit, OnDestroy {
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

  formErrors: any = {};
  validationMessages: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private service: VehicleServiceService
  ) {
    this.authService.checkExpired();
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
        data?.status.toLowerCase().startsWith(search.toLowerCase()) ||
        data?.reason.toLowerCase().startsWith(search.toLowerCase()) ||
        data?.vehicleId?.payer?.taxpayer_name
          .toLowerCase()
          .startsWith(search.toLowerCase()) ||
        this.formatDate(data?.created_at).startsWith(search.toLowerCase())
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
    this.isLoading = true;
    this.httpService.getAuthSingle(BaseUrl.vehicle_owner).subscribe(
      (data: any) => {
        this.datas = data.results;
        this.searchData = data.results;
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
    this.httpService.getAuthSingle(BaseUrl.vehicle_owner).subscribe(
      (data: any) => {
        this.datas = data.results;
        this.searchData = data.results;
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

  viewAss(data: any) {
    const data2 = {
      // old: data?.vehicleId,
      old: undefined,
      new: data?.vehicleId?.payer,
      update: true,
      data2: data,
    };
    this.service.setOwnerViewMessage(data2);
    this.router.navigate([
      '/dashboard/dashboard5/vehicle/change-owner/details',
    ]);
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
    // after dialog close
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.status === 'approved') {
        // update table data
        this.datas.filter((dat: any, index: any) => {
          if (dat.id == result.id) {
            dat.status = 'approved';
          }
        });
      } else if (result?.status === 'disapproved') {
        this.datas.filter((dat: any, index: any) => {
          if (dat.id == result.id) {
            dat.status = 'disapproved';
          }
        });
      }
    });
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
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
