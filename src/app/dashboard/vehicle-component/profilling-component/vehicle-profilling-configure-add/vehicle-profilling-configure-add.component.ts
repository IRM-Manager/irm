import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { profilling } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-profilling-configure-add',
  templateUrl: './vehicle-profilling-configure-add.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-profilling-configure-add.component.scss'],
})
export class VehicleProfillingConfigureAddComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: profilling;
  datas: any;
  vehicleRegType2: any[] = [];
  panelOpenState = false;
  loading = false;
  type = false;
  update = false;
  total = 0;

  formErrors: any = {
    name: '',
    type: '',
    capacity: '',
    duration: '',
    amount: '',
    vehicle_usage: '',
  };

  validationMessages: any = {
    name: {
      required: 'required.',
    },
    type: {
      required: 'required.',
    },
    capacity: {
      required: 'required.',
    },
    duration: {
      required: 'required.',
      min: 'Must be in the range of 1-12',
      max: 'Must be in the range of 1-12',
    },
    amount: {
      required: 'required.',
    },
    vehicle_usage: {
      required: 'required.',
    },
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _location: Location,
    private router: Router,
    private service: VehicleServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private httpService: HttpService
  ) {
    this.createForm();
    this.authService.checkExpired();
    //
    const data: any = this.service.getProfileMessage();
    if (data) {
      if (data?.type == 'create') {
        this.datas = data?.data;
        this.updateNewData();
      } else if (data?.type == 'edit') {
        this.update = true;
        this.datas = data?.data;
        this.vehicleRegType2 = data?.data?.data;
        this.updateNewData();
      } else {
        this.router.navigate(['/dashboard/dashboard5/vehicle/profilling']);
      }
    } else {
      this.router.navigate(['/dashboard/dashboard5/vehicle/profilling']);
    }
    //
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      duration: [
        '',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      capacity: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
      vehicle_usage: ['', [Validators.required]],
    });

    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
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

  updateNewData() {
    this.feedbackForm.patchValue({ name: this.datas?.name });
    this.feedbackForm.controls['vehicle_usage'].patchValue(
      this.datas?.vehicle_usage
    );
    this.feedbackForm.controls['name'].disable();
    this.feedbackForm.controls['vehicle_usage'].disable();
  }

  onSubmit() {
    this.onValueChanged();
    const feed2 = this.feedbackFormDirective.invalid;
    if (feed2 && this.vehicleRegType2?.length == 0) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading = true;
      const data = {
        name: this.datas?.name,
        vehicle_usage: this.datas?.vehicle_usage,
        data: this.vehicleRegType2,
      };
      if (this.update) {
        this.httpService
          .updateData(BaseUrl.vehicle_profile, data, `/${this.datas?.id}/`)
          .subscribe(
            (data: any) => {
              this.loading = false;
              console.log(data.data);
              this.router.navigate([
                '/dashboard/dashboard5/vehicle/profilling',
              ]);
            },
            (err) => {
              this.authService.checkExpired();
              this.loading = false;
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
      } else {
        this.httpService
          .postData(BaseUrl.vehicle_profile + '/', data)
          .subscribe(
            (data: any) => {
              this.loading = false;
              console.log(data.data);
              this.router.navigate([
                '/dashboard/dashboard5/vehicle/profilling',
              ]);
            },
            (err) => {
              this.authService.checkExpired();
              this.loading = false;
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
    } // end else
  }

  back() {
    this._location.back();
  }

  changeType(type: boolean) {
    this.type = type;
  }

  removeItem(id: number) {
    this.vehicleRegType2.splice(id, 1);
    this.sumValue();
  }

  addItem() {
    this.feedback = this.feedbackForm.value;
    let data: any = {
      name: this.feedback.capacity,
      duration: this.feedback.duration,
      amount: this.feedback.amount,
    };
    const check = this.vehicleRegType2?.filter((name: any) => {
      if (
        name.name == this.feedback.capacity &&
        name.duration == this.feedback.duration
      ) {
        return name;
      }
    });
    if (check.length > 0) {
      this.snackBar.open('Already exists.', '', {
        duration: 3000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.vehicleRegType2.push(data);
      this.sumValue();
      this.feedbackForm.patchValue({ duration: '' });
      this.feedbackForm.patchValue({ amount: '' });
      this.feedbackForm.controls['capacity'].patchValue('');
    }
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  sumValue() {
    const total = this.vehicleRegType2?.reduce((accumulator, value) => {
      return accumulator + value?.amount;
    }, 0);
    if (total) {
      this.total = total;
    } else {
    }
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

  ngOnInit(): void {
    console.log();
  }
}
