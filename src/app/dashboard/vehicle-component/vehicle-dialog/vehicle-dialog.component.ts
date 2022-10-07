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
  profillingForm!: FormGroup;
  isdelete = false;
  loading = false;
  errorMsg: any;
  formError: any;

  formErrors: any = {
    name: '',
    vehicle_usage: '',
  };

  validationMessages: any = {
    name: {
      required: 'required.',
    },
    vehicle_usage: {
      required: 'required.',
    },
  };

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
    this.profileForm();
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

  profileForm() {
    this.profillingForm = this.fb.group({
      name: ['', [Validators.required]],
      vehicle_usage: ['', [Validators.required]],
    });
    this.profillingForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.profillingForm) {
      return;
    }
    const form = this.profillingForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key];
            }
          }
        }
      }
    }
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

  changeOwnerTin() {
    this.dialogRef.disableClose = true;
    this.loading = true;
    this.httpService
      .getAuthSingle(
        BaseUrl.vehicle_by_plate + `?plateno=${this.manualForm.value.tin}`
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.dialogRef.disableClose = false;
          console.log(data);
          const data2 = {
            old: data.data,
            new: undefined,
          };
          this.service.setOwnerViewMessage(data2);
          this.router.navigate([
            '/dashboard/dashboard5/vehicle/change-owner/details',
          ]);
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

  profilling() {
    this.dialogRef.close();
  }

  checkTin() {
    if (this.data.type == 'manual2') {
      this.checkVehicleTin();
    } else if (this.data.type == 'change-owner') {
      this.changeOwnerTin();
    } else if (this.data.type == 'profilling') {
      this.profilling();
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
            if (this.data.type == 'reg-plate') {
              this.service.setCustomerPlateRegMessage(data.data);
              this.router.navigate(['/dashboard/dashboard5/vehicle/new-plate']);
            } else if (this.data.type == 'manual') {
              let data2 = data.data;
              data2.renew = true;
              const plate_data = {
                type: 'detail',
              };
              this.service.setRegVehicleMessage(data2);
              this.service.setRegMessage2(plate_data);
              this.router.navigate(['/dashboard/dashboard5/vehicle/new-reg']);
            } else if (this.data.type == 'change-owner-out') {
              let data2 = data.data;
              const plate_data = {
                type: 'detail',
              };
              this.service.setRegVehicleMessage(data2);
              this.service.setRegMessage2(plate_data);
              this.router.navigate([
                '/dashboard/dashboard5/vehicle/change-owner/new-reg',
              ]);
            }else if(this.data.type == 'penalty') {
              const plate_data = {
                data: data.data,
              };
              this.service.setOffenceMessage(plate_data);
              this.router.navigate([
                '/dashboard/dashboard5/vehicle/offence',
              ]);
            }
            this.dialogRef.close({ data: data.data });
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
      .deleteData(BaseUrl.vehicle_gen_bill, this.data.data.id + '/')
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

  appproveRequest(data: any, status: string) {
    if (
      status == 'disapproved' &&
      (this.manualForm2.value.body == '' ||
        this.manualForm2.value.body == undefined ||
        this.manualForm2.value.body == null)
    ) {
      this.snackBar.open('Please provide a Reason', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.dialogRef.disableClose = true;
      this.loading = true;
      const data2 = {
        status: status,
        reason:
          status == 'approved'
            ? 'Your change of ownrship has been approved'
            : this.manualForm2.value.body,
      };
      console.log(data2);
      this.httpService
        .postData(BaseUrl.vehicle_decide_change + `?id=${data?.id}`, data2)
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.dialogRef.disableClose = false;
            this.snackBar.open('Success', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            if (status == 'approved') {
              this.dialogRef.close({ id: data?.data?.id, status: status });
              this.dialog.open(VehicleDialogComponent, {
                data: {
                  type: 'success',
                  data: data?.data,
                },
              });
            } else {
              this.dialogRef.close({ id: data?.data?.id, status: status });
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
    this.dialogRef.close();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: 'generate_bill',
        data: this.data?.data,
        data2: this.data?.data2,
      },
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
