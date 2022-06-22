import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { MustMatch } from 'src/app/_helpers/must-match.validators';
import { BaseUrl } from 'src/environments/environment';
import { changePassword } from '../../shared/form';
import { ProfileServiceService } from '../service/profile-service.service';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./profile-change-password.component.scss'],
})
export class ProfileChangePasswordComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  datas: any;
  feedbackForm: any = FormGroup;
  feedback!: changePassword;
  loading = false;
  disabled = false;
  hide = true;
  hide2 = true;

  clickEventSubscription?: Subscription;

  formErrors: any = {
    old_password: '',
    new_password: '',
    confirmPassword: '',
  };

  validationMessages: any = {
    old_password: {
      required: 'Old password is required.',
      minlength: 'Password must be at least 4 characters long.',
      maxlength: 'Password cannot be more than 25 characters long.',
    },
    new_password: {
      required: 'New password is required.',
      minlength: 'Password must be at least 4 characters long.',
      maxlength: 'Password cannot be more than 25 characters long.',
    },
    confirmPassword: {
      required: 'Confirm password is required.',
      mustMatch: 'Must be equal to new password.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private service: ProfileServiceService
  ) {
    this.authService.checkExpired();
    this.createForm();
    //
    this.datas = this.service.getAdminMessage();
    this.clickEventSubscription = this.service
      .getClickEvent()
      .subscribe((data: any) => {
        this.datas = this.service.getAdminMessage();
      });
  }

  // 
  createForm() {
    this.feedbackForm = this.fb.group(
      {
        old_password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(25),
          ],
        ],
        new_password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(25),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('new_password', 'confirmPassword'),
      }
    );

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
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
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
      let data = {
        old_password: this.feedback.old_password,
        new_password: this.feedback.new_password,
        confirm_password: this.feedback.confirmPassword,
      };
      console.log(this.datas);
      this.httpService
        .updateData(BaseUrl.change_password, data, this.datas?.id + '/')
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.disabled = false;
            // reset form field
            this.feedbackFormDirective.resetForm();
            //
            this.snackBar.open('Update Successful', '', {
              duration: 4000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.authService.logout();
          },
          (err: any) => {
            console.log(err);
            this.loading = false;
            this.disabled = false;
            if (err.status === 400) {
              if (err.error?.new_password) {
                this.snackBar.open(err.error?.new_password, '', {
                  duration: 5000,
                  panelClass: 'error',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              } else if (err.error?.old_password) {
                this.snackBar.open(err.error?.old_password?.detail, '', {
                  duration: 5000,
                  panelClass: 'error',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            } else {
              this.snackBar.open(
                err.error?.msg || err.error?.detail || 'An Error Occured!',
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
    } // end else
  }

  ngOnInit(): void {}
}
