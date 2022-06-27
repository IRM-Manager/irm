import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { manual } from '../../shared/form';
import { PayeeServiceService } from '../service/payee-service.service';
// state management
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { Year } from '../../models/irm';
import { AddYear } from '../../../actions/irm.action';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
//

@Component({
  selector: 'app-payee-manual-input',
  templateUrl: './payee-manual-input.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-manual-input.component.scss'],
})
export class PayeeManualInputComponent implements OnInit {
  type: boolean = false;
  update = false;
  form!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;

  consolidate: string = '';
  hmo: string = '';
  other: string = '';

  @ViewChild('fform') feedbackFormDirective: any;
  @ViewChild('hmo') hmoDirective: any;
  @ViewChild('other') otherDirective: any;
  @ViewChild('consolidate') consolidateDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: manual;
  loading = false;

  datas: any;
  datas2: any;
  acceptedData: any;

  years: any;
  stateYear: Observable<Year[]>;

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
    private router: Router,
    private payeeService: PayeeServiceService,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.createForm();
    this.authService.checkExpired();
    this.createForm2();
    this.stateYear = store.select(selectAllYear);
    this.datas = this.payeeService.getMessage();
    if (this.datas) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    this.datas2 = this.payeeService.getManualMessage();
    if (this.datas2.type == 'update') {
      this.update = true;
      const change_data: any = this.payeeService.getManualMessage();
      this.datas2 = change_data.data;
    } else {
      this.update = false;
      const change_data: any = this.payeeService.getManualMessage();
      this.datas2 = change_data.data;
    }
    this.listYear();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      tin: ['', [Validators.required]],
      name: ['', [Validators.required]],
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

  createForm2() {
    this.form = this.fb.group({
      floatLabelControl: [{ value: 'yes', disabled: false }],
    });
    this.form2 = this.fb.group({
      floatLabelControl2: [{ value: 'true', disabled: false }],
    });
    this.form3 = this.fb.group({
      floatLabelControl3: [{ value: 'true', disabled: false }],
    });
  }

  onSubmit() {
    this.onValueChanged();
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
      this.loading = true;
      const data = {
        pension: Boolean(this.form2.value.floatLabelControl2),
        nhf: Boolean(this.form2.value.floatLabelControl3),
        gross: this.consolidateDirective.value.consolidate,
        employee_position: this.feedback.position,
        employeeTin: this.datas2.tin,
        hmo: this.hmoDirective.value.hmo,
        other_deductions: this.otherDirective.value.other,
      };
      this.httpService
        .postData(
          BaseUrl.register_single_paye +
            `comp_tin=${this.datas.tin}&yearId=${this.feedback.year}&is_consolidated=${this.form.value.floatLabelControl}`,
          data
        )
        .subscribe(
          (data: any) => {
            this.acceptedData = data.data;
            this.hmoDirective.value.hmo = data.data?.hmo;
            this.otherDirective.value.other = data.data?.other_deductions;
            this.consolidateDirective.value.consolidate =
              data.data?.gross_income;
            this.form.value.floatLabelControl = data.data.is_consolidated
              ? true
              : false;
            this.form2.value.floatLabelControl2 =
              data.data.compute_pension > 0 ? true : false;
            this.form3.value.floatLabelControl3 =
              data.data.compute_nhf > 0 ? true : false;
            this.loading = false;
            this.update = true;
            this.snackBar.dismiss();
            this.snackBar.open('Success', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          (err) => {
            this.loading = false;
            console.log(err);
            this.snackBar.open(
              err?.error?.message ||
                err?.error?.msg ||
                err?.error?.detail ||
                err?.error?.status ||
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
        );
    }
  }

  // update
  onUpdate() {
    this.onValueChanged();
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
      this.loading = true;

      const data = {
        other_deductions: this.otherDirective.value.other,
        pension: Boolean(this.form2.value.floatLabelControl2),
        nhf: Boolean(this.form2.value.floatLabelControl3),
        gross: this.consolidateDirective.value.consolidate,
        is_consolidated:
          this.form.value.floatLabelControl == 'yes' ? true : false,
        hmo: this.hmoDirective.value.hmo,
        employee_position: this.feedback.position,
        employeeTin: this.datas2.tin,
        basic: this.acceptedData.basic,
        housing: this.acceptedData.housing,
        tp: this.acceptedData.tp,
      };
      console.log(data)
      this.httpService
        .updateData(
          BaseUrl.update_single_paye,
          data,
          this.acceptedData.id,
          this.feedback.year
        )
        .subscribe(
          (data: any) => {
            this.acceptedData = data.data;
            console.log(data)
            this.hmoDirective.value.hmo = data.data?.hmo;
            this.otherDirective.value.other = data.data?.other_deductions;
            this.consolidateDirective.value.consolidate =
              data.data?.gross_income;
            this.form.value.floatLabelControl = data.data.is_consolidated
              ? true
              : false;
            this.form2.value.floatLabelControl2 =
              data.data.compute_pension > 0 ? true : false;
            this.form3.value.floatLabelControl3 =
              data.data.compute_nhf > 0 ? true : false;
            this.loading = false;
            this.snackBar.dismiss();
            this.snackBar.open('Success', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.update = true;
          },
          (err) => {
            this.loading = false;
            console.log(err);
            this.snackBar.open(
              err?.error?.message ||
                err?.error?.msg ||
                err?.error?.detail ||
                err?.error?.status ||
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
        );
    }
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  disableForm() {
    this.feedbackForm.controls['tin'].disable();
    this.feedbackForm.controls['name'].disable();
    this.feedbackForm.controls['company_name'].disable();
  }

  // Update form field
  updateValue() {
    this.feedbackForm.patchValue({ tin: this.datas2.tin });
    this.feedbackForm.patchValue({ name: this.datas2.full_name });
    this.feedbackForm.patchValue({
      company_name: this.datas.organisation_name,
    });
    this.feedbackForm.patchValue({ position: this.datas2.profession_trade });
  }

  listYear() {
    this.stateYear?.forEach((e) => {
      if (e.length > 0) {
        this.years = e[0].data;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
            this.years = data.results;
          },
          (err) => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.updateValue();
    this.disableForm();
  }
}
