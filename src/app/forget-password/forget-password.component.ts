import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseUrl } from 'src/environments/environment';
import { NIN } from '../dashboard/shared/form';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: NIN;
  hide = true;
  loading = false;
  disabled = false;

  formErrors: any = {
    nin: '',
  };

  validationMessages: any = {
    nin: {
      required: 'required.',
      email: 'Not a valid email.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.feedbackForm = this.fb.group({
      nin: ['', [Validators.required]],
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
    this.loading = true;
    this.disabled = true;
    this.feedback = this.feedbackForm.value;
    this.httpService.getSingleNoAuth(BaseUrl.reset_password + this.feedback.nin).subscribe(
      (data: any) => {
        this.loading = false;
        this.disabled = false;
        this.feedbackFormDirective.resetForm();
        this.snackBar.open(data.res, '', {
          duration: 3000,
          panelClass: 'success',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
        this.disabled = false;
        if (err.status == 400) {
          this.snackBar.open(err?.error?.message, '', {
            duration: 5000,
            panelClass: 'error',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open(
            err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.message ||
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
      }
    );
    // end of subscribe
  }
}
