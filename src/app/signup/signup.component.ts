import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { BaseUrl } from 'src/environments/environment';
import { signup } from '../dashboard/shared/form';
import { HttpService } from '../services/http.service';
import { MustMatch } from '../_helpers/must-match.validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    LoadingBarRouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: signup;
  hide = true;
  hide2 = true;
  loading = false;
  disabled = false;

  formErrors: any = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    username: '',
  };

  validationMessages: any = {
    name: {
      required: 'required.',
      pattern: 'firstname and lastname required.',
    },
    phone: {
      required: 'required.',
    },
    username: {
      required: 'required.',
    },
    email: {
      required: 'required.',
      email: 'Not a valid email.',
    },
    password: {
      required: 'password is required.',
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
    private snackBar: MatSnackBar,
    private router: Router,
    private httpService: HttpService
  ) {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern("^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$"),
          ],
        ],
        username: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
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
        validator: MustMatch('password', 'confirmPassword'),
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
      this.disabled = true;
      this.feedback = this.feedbackForm.value;

      const user = {
        first_name: this.feedback.name.split(' ')[0],
        last_name: this.feedback.name.split(' ')[1],
        email: this.feedback.email,
        phone: this.feedback.phone,
        password: this.feedback.password,
        username: this.feedback.username,
      };
      console.log(user);
      // perform post
      this.httpService.postRegisterData(BaseUrl.register, user).subscribe(
        (data: any) => {
          this.loading = false;
          this.disabled = false;
          this.router.navigate(['/']);
          this.snackBar.open('Registration Successful', '', {
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
              err?.error?.msg || err?.error?.detail || 'An Error Occured!',
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

  ngOnInit(): void {
    console.log();
  }
}
