import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { VehicleServiceService } from '../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-dialog.component.css'],
})
export class VehicleDialogComponent implements OnInit {
  manualForm!: FormGroup;
  manualForm2!: FormGroup;
  isdelete = false;
  loading = false;
  errorMsg: any;
  formError: any;

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService,
    private fb: FormBuilder,
    private service: VehicleServiceService
  ) {
    this.createManualForm2();
    this.createManualForm3();
    if (this.data.type == 'manual') {
      dialogRef.disableClose = true;
    }
    this.authService.checkExpired();
  }

  createManualForm2() {
    this.manualForm = this.fb.group({
      tin: [''],
    });
  }

  createManualForm3() {
    this.manualForm2 = this.fb.group({
      body: ['', [Validators.required]],
    });
  }

  checkVehicleTin() {
    this.loading = true;
    console.log(this.manualForm.value);
    this.httpService
      .getAuthSingle(
        BaseUrl.vehicle_plate_by_tin + `${this.manualForm.value.tin}`
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          console.log(data);
          if (data.data.length < 1) {
            this.snackBar.open('No available plate number for this payer', '', {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            this.dialogRef.disableClose = false;
            if (this.data.type == 'manual2') {
              this.service.setRegVehicleMessage(data.data);
              this.router.navigate(['/dashboard/dashboard5/vehicle/new-reg']);
            }
            this.dialogRef.close();
          }
        },
        (err) => {
          this.authService.checkExpired();
          this.loading = false;
          this.dialogRef.disableClose = false;
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

  checkTin() {
    if (this.data.type == 'manual2') {
      this.checkVehicleTin();
    } else {
      this.loading = true;
      console.log(this.manualForm.value);
      this.httpService
        .getAuthSingle(BaseUrl.get_payer_tin + `${this.manualForm.value.tin}`)
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.dialogRef.disableClose = false;
            console.log(data);
            const setData = {
              update: false,
              data: data.data,
            };
            // this.service.setRegMessage(setData);
            // this.router.navigate(['/dashboard/dashboard5/vehicle/reg']);
            if (this.data.type == 'reg-plate') {
              this.service.setCustomerPlateRegMessage(data.data);
              this.router.navigate(['/dashboard/dashboard5/vehicle/new-plate']);
            }
            this.dialogRef.close();
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            this.dialogRef.disableClose = false;
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
  }

  //  delete generated bill
  deleteBill() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_direct_bill, this.data.data.id + '/')
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          this.snackBar.open('Assessment Bill successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close({ id: this.data.data.id });
        },
        (err) => {
          console.log(err);
          this.isdelete = false;
          this.authService.checkExpired();
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

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  openDialog(data: any, type: string) {
    this.dialogRef.close();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  changeOwner() {
    this.router.navigate(['/dashboard/dashboard5/vehicle/change-owner']);
    this.openDialog('', 'generate_bill');
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
