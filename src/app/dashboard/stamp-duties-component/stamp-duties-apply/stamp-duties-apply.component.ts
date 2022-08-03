import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { offence } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseUrl } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http.service';
import { WitholdingServiceService } from '../../withholding-tax-component/service/witholding-service.service';

@Component({
  selector: 'app-stamp-duties-apply',
  templateUrl: './stamp-duties-apply.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./stamp-duties-apply.component.scss'],
})
export class StampDutiesApplyComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: offence;
  datas: any;
  panelOpenState = false;
  loading = false;
  plateLoading = false;

  formErrors: any = {
    violation: '',
    fine: '',
    penalty: '',
  };

  validationMessages: any = {
    violation: {
      required: 'required.',
    },
    fine: {
      required: 'required.',
    },
    penalty: {
      required: 'required.',
    },
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _location: Location,
    private service: WitholdingServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private httpService: HttpService
  ) {
    this.createForm();
    this.authService.checkExpired();
    //
    // this.datas = this.service.getRegMessage();
    // if (this.datas) {
    // } else {
    //   this.router.navigate([`/dashboard/dashboard3/witholding`]);
    // }
    //
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      violation: ['', [Validators.required]],
      penalty: ['', [Validators.required]],
      fine: ['', [Validators.required]],
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
      this.loading = true;
      const data = {
        // name: this.feedback.penalty,
        // type: this.feedback.violation,
        // price: this.price,
      };
      console.log(data);
      // this.httpService
      //   .postData(
      //     BaseUrl.vehicle_create_plateno + `${this.datas.state_tin}`,
      //     data
      //   )
      //   .subscribe(
      //     (data: any) => {
      this.loading = false;
      console.log(data);
      this.snackBar.open('Success', '', {
        duration: 5000,
        panelClass: 'success',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.service.setAssMessage({});
      this.router.navigate([`/dashboard/dashboard3/stamp/assessment`]);
      //   },
      //   (err) => {
      //     this.authService.checkExpired();
      //     this.loading = false;
      //     console.log(err);
      //     this.snackBar.open(
      //       err?.error?.message ||
      //         err?.error?.msg ||
      //         err?.error?.detail ||
      //         err?.error?.status ||
      //         'An Error Occured!',
      //       '',
      //       {
      //         duration: 5000,
      //         panelClass: 'error',
      //         horizontalPosition: 'center',
      //         verticalPosition: 'top',
      //       }
      //     );
      //   }
      // );
    } // end else
  }

  back() {
    this._location.back();
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  ngOnInit(): void {}
}
