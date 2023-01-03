import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { change_owner_vehicle } from 'src/app/dashboard/shared/form';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { AppState } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-new-reg-assessment',
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
  ],
  templateUrl: './vehicle-new-reg-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg-assessment.component.scss'],
})
export class VehicleNewRegAssessmentComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  panelOpenState = false;
  feedbackForm: any = FormGroup;
  feedback!: change_owner_vehicle;
  loading = false;
  datas: any;

  formErrors: any = {
    name: '',
    tin: '',
    number: '',
    address: '',
  };

  validationMessages: any = {
    name: {
      required: 'required.',
    },
    tin: {
      required: 'required.',
    },
    number: {
      required: 'required.',
    },
    address: {
      required: 'required.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private httpService: HttpService,
    private store: Store<AppState>,
    private authService: AuthService,
    private service: VehicleServiceService
  ) {
    this.createForm();
    this.datas = this.service.getRegMessage2();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      tin: ['', [Validators.required]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
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
    if (feed2) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.loading = true;
      console.log(this.feedback);
      const vehicle_data = this.datas?.data;
      vehicle_data.oldownerdetails = {
        previousownerName: this.feedback.name,
        previousownerAddress: this.feedback.address,
        previousownerPhone: this.feedback.number,
        previousownerTIN: this.feedback.tin,
      };
      const regtype = vehicle_data?.regtype;
      const tin = vehicle_data?.tin;
      delete vehicle_data.regtype;
      delete vehicle_data.tin;
      console.log(vehicle_data);
      this.httpService
        .postData(
          BaseUrl.vehicle_owner_out + `?tin=${tin}&regtype=${regtype}`,
          vehicle_data
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            console.log(data);
            const data2 = {
              old: undefined,
              new: data?.data?.vehicleId?.payer,
              data2: data?.data,
            };
            this.service.setOwnerViewMessage(data2);
            this.router.navigate([
              '/dashboard/dashboard5/vehicle/change-owner/details',
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

  back() {
    const plate_data = {
      type: 'detail',
      data: this.datas?.data,
      back: true,
    };
    this.service.setRegMessage2(plate_data);
    this.service.sendClickEvent2();
  }

  ngOnInit(): void {
    console.log();
  }
}
