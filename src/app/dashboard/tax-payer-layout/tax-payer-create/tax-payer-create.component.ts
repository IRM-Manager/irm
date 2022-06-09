import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { CAC, individual_create } from '../../shared/form';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-tax-payer-create',
  templateUrl: './tax-payer-create.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./tax-payer-create.component.scss'],
})
export class TaxPayerCreateComponent implements OnInit {
  active: string = 'ind';
  left_text!: string;

  @ViewChild('fform') feedbackFormDirective: any;
  @ViewChild('fform2') feedbackFormDirective2: any;

  feedbackForm: any = FormGroup;
  feedback!: individual_create;
  loading = false;
  disabled = false;
  feedbackForm2: any = FormGroup;
  feedback2!: CAC;
  loading2 = false;
  disabled2 = false;

  formErrors: any = {
    nin: '',
    birth: '',
    cac: '',
  };

  validationMessages: any = {
    nin: {
      required: 'required.',
    },
    birth: {
      required: 'required.',
    },
    cac: {
      required: 'required.',
    },
  };

  constructor(
    private router: Router,
    private direct: ActivatedRoute,
    private store: Store<AppState>,
    private authService: AuthService,
    private httpService: HttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public shared: ToggleNavService,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.createForm1();

    this.direct.paramMap.subscribe((params) => {
      if (
        params.get('id') === '' ||
        params.get('id') === undefined ||
        params.get('id') === null
      ) {
        this.active = 'ind';
        this.left_text =
          'To register Individual Tax Payer ID, provide your Identification number and \
      to create your corporate Tax Payer ID, provide your CAC number. In order to \
      enforce authorisation, your new TaxPayer account will be verified using the phone \
      number or email provided.';
      } else if (params.get('id') == 'non') {
        this.active = 'com';
        this.left_text =
          'To register Business Tax Payer ID, provide your Identification number and \
        to create your corporate Tax Payer ID, provide your CAC number. In order to \
        enforce authorisation, your new TaxPayer account will be verified using the phone \
        number or email provided.';
      } else if (params.get('id') == 'ind') {
        this.active = 'ind';
        this.left_text =
          'To register Individual Tax Payer ID, provide your Identification number and \
      to create your corporate Tax Payer ID, provide your CAC number. In order to \
      enforce authorisation, your new TaxPayer account will be verified using the phone \
      number or email provided.';
      } else {
        this.active = 'ind';
        this.left_text =
          'To register Individual Tax Payer ID, provide your Identification number and \
      to create your corporate Tax Payer ID, provide your CAC number. In order to \
      enforce authorisation, your new TaxPayer account will be verified using the phone \
      number or email provided.';
      }
    });

    const data = this.shared.getPayerMessage();

    if (data?.type == '' || data?.type == undefined || data?.type == null) {
      this.shared.setPayerMessage('');
    } else if (data?.type == 'change') {
      if (data?.payer_type == 'individual') {
        this.feedbackForm.patchValue({ nin: data?.nin });
        this.feedbackForm.patchValue({ birth: data?.birth });
      } else {
        this.feedbackForm2.patchValue({ cac: data?.cac });
      }
    } else {
      this.shared.setPayerMessage('');
    }
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      nin: ['', [Validators.required]],
      birth: ['', [Validators.required]],
    });
    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  createForm1() {
    this.feedbackForm2 = this.fb.group({
      cac: ['', [Validators.required]],
    });
    this.feedbackForm2.valueChanges.subscribe((data: any) =>
      this.onValueChanged2(data)
    );
    this.onValueChanged2(); // (re)set validation messages now
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

  ninError = false;
  birthError = false;

  checkFrom() {
    const feed1 = this.feedbackFormDirective.invalid;
    const control = this.feedbackFormDirective.form.controls;
    if (feed1) {
      if (control.nin.status == 'INVALID') {
        this.ninError = true;
        this.formErrors['nin'] = 'required.';
      } else {
        this.ninError = false;
      }
      if (control.birth.status == 'INVALID') {
        this.birthError = true;
        this.formErrors['birth'] = control.birth.errors.matDatepickerParse
          ? 'not a valid date.'
          : 'required.';
      } else {
        this.birthError = false;
      }
    } else {
      this.ninError = false;
      this.birthError = false;
    }
  }

  onSubmit() {
    this.checkFrom();
    const feed1 = this.feedbackFormDirective.invalid;
    if (feed1) {
    } // end of if
    else {
      this.loading = true;
      this.disabled = true;
      this.feedback = this.feedbackForm.value;
      const data = {
        type: '',
        payer_type: 'individual',
        nin: this.feedback.nin,
        birth: this.feedback.birth,
      };
      this.shared.setPayerMessage(data);
      this.feedbackFormDirective.resetForm();
      console.log(this.feedback);
      this.router.navigate(['/dashboard/dashboard22/taxpayer/ind/individual']);
    }
  }

  cacError = false;

  checkFrom2() {
    const feed1 = this.feedbackFormDirective2.invalid;
    const control = this.feedbackFormDirective2.form.controls;
    if (feed1) {
      if (control.cac.status == 'INVALID') {
        this.cacError = true;
        this.formErrors['cac'] = 'required.';
      } else {
        this.cacError = false;
      }
    } else {
      this.cacError = false;
    }
  }

  onSubmit2() {
    this.checkFrom2();
    const feed1 = this.feedbackFormDirective2.invalid;
    if (feed1) {
    } // end of if
    else {
      this.loading2 = true;
      this.disabled2 = true;
      this.feedback2 = this.feedbackForm2.value;
      const data = {
        type: '',
        payer_type: 'company',
        cac: this.feedback2.cac,
      };
      this.shared.setPayerMessage(data);
      this.feedbackFormDirective2.resetForm();
      console.log(this.feedback2);
      this.router.navigate(['/dashboard/dashboard22/taxpayer/non/business']);
    }
  }

  ngOnInit(): void {}

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  changeActive(type: string) {
    this.active = type;
    if (type == 'com') {
      this.left_text =
        'To register Business Tax Payer ID, provide your Identification number and \
        to create your corporate Tax Payer ID, provide your CAC number. In order to \
        enforce authorisation, your new TaxPayer account will be verified using the phone \
        number or email provided.';
    } else {
      this.left_text =
        'To register Individual Tax Payer ID, provide your Identification number and \
      to create your corporate Tax Payer ID, provide your CAC number. In order to \
      enforce authorisation, your new TaxPayer account will be verified using the phone \
      number or email provided.';
    }
  }
}
