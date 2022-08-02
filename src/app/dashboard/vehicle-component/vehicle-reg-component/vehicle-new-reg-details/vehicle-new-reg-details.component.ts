import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { vehicle_details } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-new-reg-details',
  templateUrl: './vehicle-new-reg-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg-details.component.scss'],
})
export class VehicleNewRegDetailsComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: vehicle_details;
  plateMsg: any;

  formErrors: any = {
    model: '',
    make: '',
    vehicle_type: '',
    no_carry: '',
    vin: '',
    year: '',
    color: '',
    plate: '',
    engine_capacity: '',
    fuel: '',
  };

  validationMessages: any = {
    model: {
      required: 'required.',
    },
    make: {
      required: 'required.',
    },
    year: {
      required: 'required.',
    },
    vehicle_type: {
      required: 'required.',
    },
    no_carry: {
      required: 'required.',
    },
    vin: {
      required: 'required.',
    },
    plate: {
      required: 'required.',
    },
    color: {
      required: 'required.',
    },
    engine_capacity: {
      required: 'required.',
    },
    fuel: {
      required: 'required.',
    },
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private service: VehicleServiceService
  ) {
    this.createForm();
    this.authService.checkExpired();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      model: ['', [Validators.required]],
      make: ['', [Validators.required]],
      vehicle_type: ['', [Validators.required]],
      no_carry: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      year: ['', [Validators.required]],
      color: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      engine_capacity: ['', [Validators.required]],
      fuel: ['', [Validators.required]],
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
      this.feedback = this.feedbackForm.value;
      const data = {
        type: 'plate',
        data: this.feedback,
      };
      this.service.setRegMessage2(data);
      this.service.sendClickEvent2();
      console.log(this.feedback);
    } // end else
  }

  ngOnInit(): void {}
}
