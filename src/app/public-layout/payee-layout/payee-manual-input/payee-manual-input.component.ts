import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { manual } from '../../shared/form';

@Component({
  selector: 'app-payee-manual-input',
  templateUrl: './payee-manual-input.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-manual-input.component.scss'],
})
export class PayeeManualInputComponent implements OnInit {
  // floatLabelControl = new FormControl('true');
  type: boolean = false;
  form!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;

  consolidate: string = '';

  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: manual;
  loading = false;

  formErrors: any = {
    tin: '',
    name: '',
    date: '',
    company_name: '',
    year: '',
  };

  validationMessages: any = {
    tin: {
      required: 'required.',
    },
    name: {
      required: 'required.',
    },
    date: {
      required: 'required.',
    },
    company_name: {
      required: 'required.',
    },
    year: {
      required: 'required.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createForm();
    this.authService.checkExpired();
    this.createForm2();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      tin: ['', [Validators.required]],
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      position: [''],
      company_name: ['', [Validators.required]],
      year: ['', [Validators.required]],
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

  onSubmit() {
    this.loading = true;
    this.feedback = this.feedbackForm.value;
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      console.log(this.feedback);
      this.router.navigate(['/dashboard3/taxpayer/payee/manage']);
    }
  }

  createForm2() {
    this.form = this.fb.group({
      floatLabelControl: [{ value: 'true', disabled: false }],
    });
    this.form2 = this.fb.group({
      floatLabelControl2: [{ value: 'true', disabled: false }],
    });
    this.form3 = this.fb.group({
      floatLabelControl3: [{ value: 'true', disabled: false }],
    });
  }

  modelChange(consolidate: any) {
    console.log(consolidate);
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  changeType(type: boolean) {
    this.type = type;
    if (type == true) {
      this.form.get('floatLabelControl')?.enable();
      this.form2.get('floatLabelControl2')?.enable();
      this.form3.get('floatLabelControl3')?.enable();
    } else {
      this.form.get('floatLabelControl')?.disable();
      this.form2.get('floatLabelControl2')?.disable();
      this.form3.get('floatLabelControl3')?.disable();
    }
  }

  ngOnInit(): void {}
}
