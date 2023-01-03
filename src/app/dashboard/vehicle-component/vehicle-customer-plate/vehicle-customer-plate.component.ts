import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { offence } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-customer-plate',
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
    MatToolbarModule,
    MatSelectModule,
  ],
  templateUrl: './vehicle-customer-plate.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-customer-plate.component.scss'],
})
export class VehicleCustomerPlateComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: offence;
  datas: any;
  panelOpenState = false;
  loading = false;
  plateLoading = false;
  custom = false;
  available_data: any;
  price = 0;

  formErrors: any = {
    violation: '',
    fine: '',
    penalty: '',
  };

  validationMessages: any = {
    violation: {
      required: 'required.',
    },
    fine: {
      required: 'required.',
    },
    penalty: {
      required: 'required.',
    },
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _location: Location,
    private service: VehicleServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private httpService: HttpService
  ) {
    this.createForm();
    this.authService.checkExpired();
    //
    this.datas = this.service.getCustomerPlateRegMessage();
    if (this.datas) {
    } else {
      this.router.navigate([`/dashboard/dashboard5/vehicle/reg-plate`]);
    }
    //
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      violation: ['', [Validators.required]],
      fine: ['', [Validators.required]],
      penalty: ['', [Validators.required]],
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

  onSubmit() {
    this.onValueChanged();
    const feed2 = this.feedbackFormDirective.invalid;
    if (feed2) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading = true;
      this.feedback = this.feedbackForm.value;
      this.loading = true;
      const data = {
        name: this.feedback.penalty,
        type: this.feedback.violation,
        price: this.price,
      };
      const get_plate_id = this.available_data?.filter((name: any) => {
        return name.name == this.feedback.penalty;
      });
      if (this.feedback.violation == 'fancy') {
        this.httpService
          .postData(
            BaseUrl.vehicle_create_plateno + `${this.datas.state_tin}`,
            data
          )
          .subscribe(
            (data: any) => {
              this.loading = false;
              console.log(data);
              this.snackBar.open('Success', '', {
                duration: 5000,
                panelClass: 'success',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.router.navigate([`/dashboard/dashboard5/vehicle/reg-plate`]);
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
      } // end else
      else {
        this.httpService
          .updateData(
            BaseUrl.vehicle_plateno,
            { status: 'approved' },
            `${get_plate_id[0].id}/?tin=${this.datas.state_tin}`
          )
          .subscribe(
            (data: any) => {
              this.loading = false;
              console.log(data);
              this.snackBar.open('Success', '', {
                duration: 5000,
                panelClass: 'success',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.router.navigate([`/dashboard/dashboard5/vehicle/reg-plate`]);
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

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  checkPlate(type: string) {
    this.plateLoading = true;
    this.httpService
      .getAuthSingle(BaseUrl.vehicle_plate_type + `${type}`)
      .subscribe(
        (data: any) => {
          this.plateLoading = false;
          this.available_data = data.data;
          console.log(data);
        },
        (err) => {
          this.authService.checkExpired();
          this.plateLoading = false;
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

  selectCustom(type: boolean, type2: string) {
    this.custom = type;
    if (type2 != 'fancy') {
      this.feedbackForm.patchValue({ penalty: null });
      this.feedbackForm.controls['fine'].enable();
      this.feedbackForm.patchValue({ fine: null });
      this.price = 0;
      this.checkPlate(type2);
    } else {
      this.available_data = null;
      this.feedbackForm.patchValue({ fine: 80000 });
      this.price = 80000 || 0;
      this.feedbackForm.controls['fine'].disable();
    }
  }

  getPrice(data: any) {
    this.feedbackForm.patchValue({ fine: data?.price });
    this.price = data?.price || 0;
    this.feedbackForm.controls['fine'].disable();
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  ngOnInit(): void {
    console.log();
  }
}
