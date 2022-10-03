import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { profilling } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';
import { Router } from '@angular/router';

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
  plateMsg: any;
  panelOpenState = false;
  loading = false;
  type = false;

  formErrors: any = {
    name: '',
    type: '',
    capacity: '',
    duration: '',
    amount: '',
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
    },
    amount: {
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
    private dialog: MatDialog
  ) {
    this.createForm();
    this.authService.checkExpired();
    // this.feedbackForm.controls['year'].disable();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
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
      console.log(this.feedback);
      this.router.navigate([
        '/dashboard/dashboard5/vehicle/profilling/configure',
      ]);
    } // end else
  }

  back() {
    this._location.back();
  }

  changeType(type: boolean) {
    this.type = type;
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
