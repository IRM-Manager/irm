import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { login } from '../public-layout/shared/form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: login;
  hide = true;
  forms = ['username', 'password']
  loading = false;
  disabled = false;

  formErrors: any = {
    'username': '',
    'password': '',
  };

  validationMessages: any = {
    'username': {
      'required':      'username is required.',
    },
    'password': {
      'required':      'password is required.'
    }
  };


  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService,
    private router: Router) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
        username: ['', [Validators.required] ],
        password: ['', [Validators.required] ],
      },
    );

    this.feedbackForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
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


  onSubmit() {

    this.loading = true
    this.disabled = true
    this.feedback = this.feedbackForm.value;

    const user = {
        username: this.feedback.username,
        password: this.feedback.password,
    }
    // perform login
    this.authService.login(user)
    .subscribe(
      (data: any) => {
        this.loading = false
        this.disabled = false;
        if (data) {
          this.router.navigate(['/dashboard']);
          this.snackBar.open('success', "", {
            duration: 3000,
            panelClass: "success"
          });
        }

      }
    )
    // end of subscribe
  }


}
