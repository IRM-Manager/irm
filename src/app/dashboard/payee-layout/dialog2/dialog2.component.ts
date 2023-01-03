import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { com_verify } from '../../shared/form';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-dialog2',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './dialog2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dialog2.component.scss'],
})
export class Dialog2Component implements OnInit {
  @ViewChild('fform2') feedbackFormDirective2: any;
  loading = false;
  disabled = false;
  is_ind = true;
  regis_data: any;
  errorMsg: any;
  feedbackForm2: any = FormGroup;
  feedback2!: com_verify;
  clickEventSubscription?: Subscription;

  formErrors: any = {
    phone: '',
    type: '',
  };

  validationMessages: any = {
    phone: {
      required: 'required.',
    },
    type: {
      required: 'required.',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<Dialog2Component>,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm2();
    this.authService.checkExpired();
  }

  createForm2() {
    this.feedbackForm2 = this.fb.group({
      type: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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

  checkTin() {
    this.onValueChanged2();
    const feed1 = this.feedbackFormDirective2.invalid;
    if (feed1) {
    } // end of if
    else {
      this.dialogRef.disableClose = true;
      this.loading = true;
      this.disabled = true;
      this.feedback2 = this.feedbackForm2.value;
      this.httpService
        .getAuthSingle(BaseUrl.get_payer_tin + `${this.feedback2.phone}`)
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.dialogRef.disableClose = false;
            console.log(data);
            if (data.data.payer_type == 'company') {
              this.errorMsg = data.data.taxpayer_name;
              this.regis_data = data.data;
            } else {
              this.errorMsg = null;
              this.snackBar.open('Invalid GTin', '', {
                duration: 5000,
                panelClass: 'error',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            this.disabled = false;
            this.dialogRef.disableClose = false;
            this.errorMsg = null;
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

  onSubmit() {
    this.onValueChanged2();
    const feed1 = this.feedbackFormDirective2.invalid;
    if (feed1) {
    } // end of if
    else {
      this.dialogRef.disableClose = true;
      this.loading = true;
      this.disabled = true;
      this.feedback2 = this.feedbackForm2.value;
      const data = {
        company_tin: this.regis_data.state_tin,
        reg_type: this.feedback2.type,
      };
      this.httpService
        .postData(
          BaseUrl.register_paye + `company_tin=${this.regis_data.state_tin}`,
          data
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.snackBar.open('Registration Successful', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            console.log(data);
            this.dialogRef.close(data.data);
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            this.disabled = false;
            this.dialogRef.disableClose = false;
            console.log(err);
            this.errorMsg = null;
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

  ngOnInit(): void {
    console.log();
  }
}
