import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { directAss } from '../../shared/form';

@Component({
  selector: 'app-self-create',
  templateUrl: './self-create.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./self-create.component.scss'],
})
export class SelfCreateComponent implements OnInit {
  @ViewChild('fform2') feedbackFormDirective2: any;

  loading = false;
  disabled = false;
  data: any;

  feedbackForm2: any = FormGroup;
  feedback2!: directAss;

  clickEventSubscription?: Subscription;

  formErrors: any = {
    year: '',
    source: '',
    amount: '',
    deduction: '',
    amount2: '',
    agree: '',
  };

  validationMessages: any = {
    year: {
      required: 'required.',
    },
    source: {
      required: 'required.',
    },
    amount: {
      required: 'required.',
    },
    deduction: {
      required: 'required.',
    },
    amount2: {
      required: 'required.',
    },
    agree: {
      required: 'required.',
    },
  };

  constructor(private fb: FormBuilder) {
    this.createForm2();
  }

  createForm2() {
    this.feedbackForm2 = this.fb.group({
      year: ['', [Validators.required]],
      source: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      deduction: ['', [Validators.required]],
      amount2: ['', [Validators.required]],
      agree: ['', [Validators.required]],
    });
    this.feedbackForm2.valueChanges.subscribe((data: any) =>
      this.onValueChanged2(data)
    );
    this.onValueChanged2(); // (re)set validation messages now
  }

  onValueChanged2(data?: any) {
    if (!this.feedbackForm2) {
      return;
    }
    const form = this.feedbackForm2;
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
    this.onValueChanged2();
    const feed1 = this.feedbackFormDirective2.invalid;
    if (feed1) {
    } // end of if
    else {
      this.loading = true;
      this.disabled = true;
      this.feedback2 = this.feedbackForm2.value;
      console.log(this.feedback2);
      // const data = {
      //   company_tin: this.regis_data.state_tin,
      //   reg_type: this.feedback2.type,
      // };
      // this.httpService
      //   .postData(
      //     BaseUrl.register_paye + `company_tin=${this.regis_data.state_tin}`,
      //     data
      //   )
      //   .subscribe(
      //     (data: any) => {
      //       this.loading = false;
      //       this.snackBar.open("Registration Successful", '', {
      //         duration: 3000,
      //         panelClass: 'success',
      //         horizontalPosition: 'center',
      //         verticalPosition: 'top',
      //       });
      //       console.log(data);
      //       this.dialogRef.close(data.data);
      //     },
      //     (err) => {
      //       this.authService.checkExpired();
      //       this.loading = false;
      //       this.disabled = false;
      //       this.dialogRef.disableClose = false;
      //       console.log(err);
      //       this.errorMsg = null;
      //       this.snackBar.open(
      //         err?.error?.message ||
      //           err?.error?.msg ||
      //           err?.error?.detail ||
      //           err?.error?.status ||
      //           'An Error Occured!',
      //         '',
      //         {
      //           duration: 5000,
      //           panelClass: 'error',
      //           horizontalPosition: 'center',
      //           verticalPosition: 'top',
      //         }
      //       );
      //     }
      //   );
    }
  }

  ngOnInit(): void {}
}
