import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { witholding } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { WitholdingServiceService } from '../service/witholding-service.service';

@Component({
  selector: 'app-witholding-apply',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
  ],
  templateUrl: './witholding-apply.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./witholding-apply.component.scss'],
})
export class WitholdingApplyComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: witholding;
  datas: any;
  panelOpenState = false;
  loading = false;
  plateLoading = false;

  formErrors: any = {
    category: '',
    name: '',
    tin: '',
    amount: '',
  };

  validationMessages: any = {
    category: {
      required: 'required.',
    },
    name: {
      required: 'required.',
    },
    tin: {
      required: 'required.',
    },
    amount: {
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
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      tin: ['', [Validators.required]],
      amount: ['', [Validators.required]],
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
      this.router.navigate([`/dashboard/dashboard3/witholding/assessment`]);
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

  ngOnInit(): void {
    console.log();
  }
}
