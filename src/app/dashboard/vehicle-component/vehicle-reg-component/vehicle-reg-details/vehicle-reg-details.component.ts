import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'jquery';
import { vehicle_details } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vehicle-reg-details',
  templateUrl: './vehicle-reg-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg-details.component.scss'],
})
export class VehicleRegDetailsComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: vehicle_details;

  formErrors: any = {
    reg_type: '',
    category: '',
    model: '',
    make: '',
    sub_type: '',
    vehicle_type: '',
    no_carry: '',
    vin: '',
    weight: '',
    color: '',
    gross_weight: '',
    engine_capacity: '',
    fuel: '',
  };

  validationMessages: any = {
    reg_type: {
      required: 'required.',
    },
    category: {
      required: 'required.',
    },
    model: {
      required: 'required.',
    },
    make: {
      required: 'required.',
    },
    sub_type: {
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
    weight: {
      required: 'required.',
    },
    color: {
      required: 'required.',
    },
    gross_weight: {
      required: 'required.',
    },
    engine_capacity: {
      required: 'required.',
    },
    fuel: {
      required: 'required.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {    
    this.createForm();
    this.authService.checkExpired();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      reg_type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      model: ['', [Validators.required]],
      make: ['', [Validators.required]],
      sub_type: ['', [Validators.required]],
      vehicle_type: ['', [Validators.required]],
      no_carry: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      color: ['', [Validators.required]],
      gross_weight: ['', [Validators.required]],
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
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  checkValidity() {
    const feed1 = this.feedbackFormDirective.invalid;
    const control = this.feedbackFormDirective.form.controls;
    if (feed1) {
      if (control.reg_type.status == 'INVALID') {
        this.formErrors['reg_type'] = 'required.';
        if (control.category.status == 'INVALID') {
          this.formErrors['category'] = 'required.';
        }
        if (control.model.status == 'INVALID') {
          this.formErrors['model'] = 'required.';
        }
        if (control.make.status == 'INVALID') {
          this.formErrors['make'] = 'required.';
        }
        if (control.sub_type.status == 'INVALID') {
          this.formErrors['sub_type'] = 'required.';
        }
        if (control.vehicle_type.status == 'INVALID') {
          this.formErrors['vehicle_type'] = 'required.';
        }
        if (control.no_carry.status == 'INVALID') {
          this.formErrors['no_carry'] = 'required.';
        }
        if (control.vin.status == 'INVALID') {
          this.formErrors['vin'] = 'required.';
        }
        if (control.weight.status == 'INVALID') {
          this.formErrors['weight'] = 'required.';
        }
        if (control.color.status == 'INVALID') {
          this.formErrors['color'] = 'required.';
        }
        if (control.gross_weight.status == 'INVALID') {
          this.formErrors['gross_weight'] = 'required.';
        }
        if (control.engine_capacity.status == 'INVALID') {
          this.formErrors['engine_capacity'] = 'required.';
        }
        if (control.fuel.status == 'INVALID') {
          this.formErrors['fuel'] = 'required.';
        }
      }
    }
  }

  onSubmit() {
    this.checkValidity();
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
      console.log(data);
    } // end else
  }

  ngOnInit(): void {}
}
