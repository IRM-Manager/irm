import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-reg-assessment',
  templateUrl: './vehicle-reg-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg-assessment.component.scss'],
})
export class VehicleRegAssessmentComponent implements OnInit {
  search: string = '';
  dtOptions: DataTables.Settings = {};
  datas2: any;
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = false;
  is_reload = false;

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
      .getAuthSingle(BaseUrl.vehicle_gen_ass + `?vehicleId=${this.datas2?.id}`)
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
    // this.service.setviewSelfMessage(data);
    // this.service.setAYearMessage({
    //   yearId: data.assessment.assessment_year || this.htmlYear,
    // });
    this.router.navigate(['/dashboard/dashboard5/vehicle/document']);
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

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  edit(data: any) {
    const setData = {
      update: true,
      data: data,
    };
    // this.service.setMessage(setData);
    // this.service.setAYearMessage({
    //   yearId: data.assessment.assessment_year || this.htmlYear,
    // });
    // this.router.navigate(['/dashboard/dashboard5/direct/self/create']);
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
