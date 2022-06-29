import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { manual } from '../../shared/form';
import { PayeeServiceService } from '../service/payee-service.service';
// state management
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddYear } from '../../../actions/irm.action';
import { Year } from '../../models/irm';

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

  consolidate: any = 0;
  hmo: any = 0;
  other: any = 0;

  basic: any = 0;
  housing: any = 0;
  tp: any = 0;

  @ViewChild('fform') feedbackFormDirective: any;

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
    this.listYear();
    this.datas2 = this.payeeService.getManualMessage();
    if (this.datas2.type == 'update') {
      this.update = true;
      const change_data: any = this.payeeService.getManualMessage();
      this.datas2 = change_data.data;
      console.log(this.datas2);
    } else {
      this.update = false;
      const change_data: any = this.payeeService.getManualMessage();
      this.datas2 = change_data.data;
      this.updateValue();
    }
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
      floatLabelControl: [{ value: 'true', disabled: false }],
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
      const data: any = {
        pension: this.form2.value.floatLabelControl2 == 'true' ? true : false,
        is_consolidated:
          this.form.value.floatLabelControl == 'true' ? true : false,
        nhf: this.form3.value.floatLabelControl3 == 'true' ? true : false,
        gross: this.consolidate,
        employee_position: this.feedback.position,
        employeeTin: this.datas2.tin,
        hmo: this.hmo,
        other_deductions: this.other,
        basic: this.basic,
        housing: this.housing,
        tp: this.tp,
      };
      if (this.form.value.floatLabelControl == 'true') {
        delete data.basic;
        delete data.housing;
        delete data.tp;
      } else {
        delete data.gross;
      }
      console.log(data);
      this.httpService
        .postData(
          BaseUrl.register_single_paye +
            `comp_tin=${this.datas.tin}&yearId=${this.feedback.year}`,
          data
        )
        .subscribe(
          (data: any) => {
            console.log(data);
            this.acceptedData = data.data;
            this.hmo = data.data?.hmo;
            this.other = data.data?.other_deductions;
            this.consolidate = data.data?.gross_income;

            this.form.patchValue({
              floatLabelControl: data.data?.is_consolidated ? 'true' : 'false',
            });
            this.form2.patchValue({
              floatLabelControl2:
                data.data?.compute_pension > 0 ? 'true' : 'false',
            });
            this.form3.patchValue({
              floatLabelControl3: data.data?.compute_nhf > 0 ? 'true' : 'false',
            });

            this.basic = data.data?.basic;
            this.housing = data.data?.housing;
            this.tp = data.data?.tp;

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
            this.authService.checkExpired();
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

      const data: any = {
        other_deductions: this.other,
        pension: this.form2.value.floatLabelControl2 == 'true' ? true : false,
        nhf: this.form3.value.floatLabelControl3 == 'true' ? true : false,
        gross: this.consolidate,
        is_consolidated:
          this.form.value.floatLabelControl == 'true' ? true : false,
        hmo: this.hmo,
        employee_position: this.feedback.position,
        employeeTin: this.datas2.tin || this.datas2.employeeTin,
        basic: this.basic,
        housing: this.housing,
        tp: this.tp,
      };
      if (this.form.value.floatLabelControl == 'true') {
        delete data.basic;
        delete data.housing;
        delete data.tp;
      } else {
        delete data.gross;
      }
      console.log(data);
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
            console.log(data);

            this.hmo = data.data?.hmo;
            this.other = data.data?.other_deductions;
            this.consolidate = data.data?.gross_income;

            this.form.patchValue({
              floatLabelControl: data.data?.is_consolidated ? 'true' : 'false',
            });
            this.form2.patchValue({
              floatLabelControl2:
                data.data?.compute_pension > 0 ? 'true' : 'false',
            });
            this.form3.patchValue({
              floatLabelControl3: data.data?.compute_nhf > 0 ? 'true' : 'false',
            });

            this.basic = data.data?.basic;
            this.housing = data.data?.housing;
            this.tp = data.data?.tp;

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
            this.authService.checkExpired();
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

  updateValue2() {
    this.feedbackForm.patchValue({
      company_name: this.datas.organisation_name,
    });
    this.feedbackForm.patchValue({ tin: this.datas2.employeeTin });
    this.feedbackForm.patchValue({ name: this.datas2.employee });
    this.feedbackForm.patchValue({ year: this.datas2.yearId });
    this.feedbackForm.patchValue({ position: this.datas2.employee_position });
    this.acceptedData = this.datas2;

    this.hmo = this.datas2?.hmo;
    this.other = this.datas2?.other_deductions;
    this.consolidate = this.datas2?.gross_income;

    this.form.patchValue({
      floatLabelControl: this.datas2?.is_consolidated ? 'true' : 'false',
    });
    this.form2.patchValue({
      floatLabelControl2: this.datas2?.compute_pension > 0 ? 'true' : 'false',
    });
    this.form3.patchValue({
      floatLabelControl3: this.datas2?.compute_nhf > 0 ? 'true' : 'false',
    });

    this.basic = this.datas2?.basic;
    this.housing = this.datas2?.housing;
    this.tp = this.datas2?.tp;
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

  back() {
    if (this.update) {
      this.payeeService.setAsYearMessage({yearId: this.acceptedData.taxYear});
      this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/manage']);
    } else {
      this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/manage']);
    }
  }

  ngOnInit(): void {
    this.disableForm();
    if (this.update) {
      this.updateValue2();
    }
  }
}
