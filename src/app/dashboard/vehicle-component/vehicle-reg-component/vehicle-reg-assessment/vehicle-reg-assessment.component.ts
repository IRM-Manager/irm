import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-reg-assessment',
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
    MatSelectModule,
    DataTablesModule,
  ],
  templateUrl: './vehicle-reg-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg-assessment.component.scss'],
})
export class VehicleRegAssessmentComponent implements OnDestroy, OnInit {
  search: string = '';
  dtOptions: DataTables.Settings = {};
  datas2: any;
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = false;
  is_reload = false;
  gen_loading: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private service: VehicleServiceService
  ) {
    this.datas2 = this.service.getAssMessage();
    this.authService.checkExpired();
    if (this.datas2) {
    } else {
      this.router.navigate([`/dashboard/dashboard5/vehicle/reg-vehicle`]);
    }
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
    const data = this.searchData.filter((data: any) => {
      return (
        data?.assess_code.toLowerCase().includes(search.toLowerCase()) ||
        data?.revitems?.length == search ||
        this.formatDate(data?.assessment_date).includes(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5000,
      lengthChange: false,
      info: false,
    };
    this.isLoading = true;
    this.httpService
      .getAuthSingle(BaseUrl.vehicle_view_ass + `?vehicleId=${this.datas2?.id}`)
      .subscribe(
        (data: any) => {
          this.datas = data.data;
          this.searchData = data.data;
          this.isLoading = false;
          console.log(data);
        },
        (err) => {
          this.isLoading = false;
          this.authService.checkExpired();
        }
      );
  }

  reload() {
    this.is_reload = true;
    this.httpService
      .getAuthSingle(BaseUrl.vehicle_gen_ass + `?vehicleId=${this.datas2?.id}`)
      .subscribe(
        (data: any) => {
          this.datas = data.data;
          this.searchData = data.data;
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
        (err) => {
          this.is_reload = false;
          this.authService.checkExpired();
        }
      );
  }

  viewAss(data: any, type: string) {
    if (type == 'view_ass') {
      this.datas2.update = true;
      this.datas2.vehregtype = 'plate';
      this.datas2.payer.update = true;
      this.datas2.payer.vehregtype = 'plate';
      const plate_data = {
        type: 'plate',
        data: this.datas2,
        data2: data,
      };
      this.service.setRegVehicleMessage(this.datas2?.payer);
      this.service.setRegMessage2(plate_data);
      this.router.navigate(['/dashboard/dashboard5/vehicle/new-reg']);
    } else if (type == 'gen_bill') {
      this.generateBill(data);
    } else if (type == 'delete') {
      this.deleteAss(data);
    } else {
    }
  }

  // generate bill
  generateBill(data2: any) {
    this.gen_loading.push(data2.id);
    this.httpService
      .postData(
        BaseUrl.vehicle_gen_bill +
          `?assessId=${data2.id}&tin=${this.datas2?.payer?.state_tin}`,
        {}
      )
      .subscribe(
        (data: any) => {
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(data.data);
          this.openDialog(
            data?.data[0] || data?.data,
            this.datas2,
            'generate_bill'
          );
        },
        (err) => {
          this.authService.checkExpired();
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(err);
          this.snackBar.open(
            err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              'An Error Occured!',
            '',
            {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
  }

  // generate bill
  deleteAss(data2: any) {
    this.gen_loading.push(data2.id);
    this.httpService
      .deleteData(BaseUrl.vehicle_gen_ass, data2.id + '/')
      .subscribe(
        (data: any) => {
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(data);
          const data_index = this.datas.findIndex((object) => {
            return object.id === data2.id;
          });
          this.datas.splice(data_index, 1);
          this.snackBar.open('Assessment Successfully deleted!', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        (err) => {
          this.authService.checkExpired();
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(err);
          this.snackBar.open(
            err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              err?.error ||
              'An Error Occured!',
            '',
            {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
  }

  openDialog(data: any, data2: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
        data2: data2,
      },
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
