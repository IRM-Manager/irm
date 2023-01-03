import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { offence } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
// state management
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-offence',
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
    MatExpansionModule,
  ],
  templateUrl: './vehicle-offence.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-offence.component.scss'],
})
export class VehicleOffenceComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: offence;
  plateMsg: any;
  panelOpenState = false;
  loading = false;
  reg_error = false;
  reg_loading = false;
  vehicleRegType2: any[] = [];
  vehicleRegType3 = 0;
  vehicleRegType: any;
  total = 0;
  datas: any;

  formErrors: any = {
    violation: '',
    fine: '',
  };

  validationMessages: any = {
    violation: {
      required: 'required.',
    },
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _location: Location,
    private service: VehicleServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private httpService: HttpService
  ) {
    this.createForm();
    this.authService.checkExpired();
    const data: any = this.service.getOffenceMessage();
    this.datas = data?.data?.payer || data?.data;
    this.vehicleRegType2 = data?.data?.revitems;
    this.vehicleRegType = this.service.getPenaltyMessage();
    if (this.datas) {
    } else {
      this.router.navigate([`/dashboard/dashboard5/vehicle/penalty`]);
    }
    this.getOffences();
    this.sumValue();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      violation: ['', [Validators.required]],
      fine: [''],
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
    this.feedback = this.feedbackForm.value;
    const feed2 = this.feedbackFormDirective.invalid;
    if (feed2 && this.vehicleRegType2.length == 0) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading = true;
      this.httpService
        .postData(
          BaseUrl.vehicle_add_offence + `?tin=${this.datas?.state_tin}`,
          { items: this.vehicleRegType2 }
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            console.log(data);
            let plate_data = data?.data;
            plate_data.assessment = plate_data;
            plate_data.bill_status = plate_data.remitted;
            plate_data.bill_code = plate_data.assess_code;
            plate_data.bill_total = plate_data.assessment_total;
            this.router.navigate([`/dashboard/dashboard5/vehicle/penalty`]);
            this.openDialog(plate_data, '', 'generate_bill');
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
  }

  back() {
    this._location.back();
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

  removeItem(id: number) {
    this.vehicleRegType2.splice(id, 1);
    this.sumValue();
  }

  addItem(data: any) {
    this.vehicleRegType3 = data?.id;
    this.feedbackForm.patchValue({ fine: this.formatMoney(data?.amount || 0) });
    this.feedbackForm.controls['fine'].disable();
  }

  save() {
    const getExisting = this.vehicleRegType2?.filter((name: any) => {
      return name.id === this.vehicleRegType3;
    });
    if (getExisting?.length > 0) {
      this.snackBar.open('Already exists.', '', {
        duration: 3000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.snackBar.dismiss();
      const data = this.vehicleRegType?.filter((name: any) => {
        return name.id === this.vehicleRegType3;
      });
      try {
        this.vehicleRegType2 = this.vehicleRegType2.concat(data[0]);
      } catch (e) {
        this.vehicleRegType2 = [data[0]];
      }
      this.sumValue();
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

  getOffences() {
    this.reg_loading = true;
    this.reg_error = false;
    if (this.vehicleRegType) {
      this.reg_error = false;
      this.reg_loading = false;
    } else {
      this.httpService
        .getAuthSingle(BaseUrl.vehicle_offence)
        .subscribe((data: any) => {
          this.reg_loading = false;
          this.reg_error = false;
          this.vehicleRegType = data?.data;
          console.log(data);
        }),
        (error: any) => {
          this.reg_loading = false;
          this.reg_error = false;
          console.log(error);
        };
    }
  }

  ngOnInit(): void {
    console.log();
  }
}
