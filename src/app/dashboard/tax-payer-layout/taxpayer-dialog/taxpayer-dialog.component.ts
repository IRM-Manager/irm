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
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { com_verify, ind_verify } from '../../shared/form';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-taxpayer-dialog',
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
    DataTablesModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './taxpayer-dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./taxpayer-dialog.component.scss'],
})
export class TaxpayerDialogComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  @ViewChild('fform2') feedbackFormDirective2: any;
  feedbackForm: any = FormGroup;
  feedback!: ind_verify;
  loading = false;
  disabled = false;
  is_ind = true;
  feedbackForm2: any = FormGroup;
  feedback2!: com_verify;
  clickEventSubscription?: Subscription;

  formErrors: any = {
    phone: '',
    birth: '',
    type: '',
  };

  validationMessages: any = {
    phone: {
      required: 'required.',
    },
    birth: {
      required: 'required.',
      matDatepickerParse: 'not a valid date',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<TaxpayerDialogComponent>,
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
    this.createForm();
    this.createForm2();
    this.authService.checkExpired();

    this.clickEventSubscription = this.shared
      .getchangeRegTypeClickEvent2()
      .subscribe((data: any) => {
        this.changeActiveReg(false, 'business');
      });
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      type: ['individual'],
      birth: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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
    this.feedbackForm2 = this.fb.group({
      type: ['individual'],
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

  onSubmit() {
    this.onValueChanged();
    const feed1 = this.feedbackFormDirective.invalid;
    if (feed1) {
    } // end of if
    else {
      this.dialogRef.disableClose = true;
      this.loading = true;
      this.disabled = true;
      this.feedback = this.feedbackForm.value;
      const birth = this.datepipe.transform(this.feedback.birth, 'dd-MM-yyyy');
      this.httpService
        .getSingleNoAuth(
          BaseUrl.verify_nin + `phone=${this.feedback.phone}&dob=${birth}`
        )
        .subscribe(
          (data: any) => {
            const accepted_data = {
              type: '',
              v_type: 'nin',
              payer_type: 'individual',
              surname: data.data.surname,
              birthdate: data.data.birthdate,
              emplymentstatus: data.data.emplymentstatus,
              firstname: data.data.firstname,
              gender: data.data.gender == 'm' ? 'male' : 'female',
              photo: data.data.photo,
              profession: data.data.profession,
              residence_AdressLine1: data.data.residence_AdressLine1,
              residence_Town: data.data.residence_Town,
              residence_lga: data.data.residence_lga,
              residence_state: data.data.residence_state,
              telephoneno: data.data.telephoneno,
              title: data.data.title,
            };
            this.loading = false;
            this.snackBar.dismiss();
            this.dialogRef.close();
            this.snackBar.open(data.message, '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.shared.setPayerMessage(accepted_data);
            this.router.navigate([
              '/dashboard/dashboard22/taxpayer/ind/individual',
            ]);
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            this.disabled = false;
            this.dialogRef.disableClose = false;
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

  onSubmit2() {
    this.onValueChanged2();
    const feed1 = this.feedbackFormDirective2.invalid;
    if (feed1) {
    } // end of if
    else {
      this.loading = true;
      this.disabled = true;
      this.feedback2 = this.feedbackForm2.value;
      const data = {
        type: '',
        v_type: 'cac',
        payer_type: 'company',
        // cac: this.feedback2.cac,
      };
      this.shared.setPayerMessage(data);
      this.router.navigate(['/dashboard/dashboard22/taxpayer/non/business']);
      this.dialogRef.close();
    }
  }

  changeActiveReg(type: boolean, type2: string) {
    this.is_ind = type;
    this.feedbackForm.patchValue({ type: type2 });
    this.feedbackForm2.patchValue({ type: type2 });
  }

  ninReg() {
    this.dialog.open(TaxpayerDialogComponent, {
      data: {
        type: 'nin-regis',
      },
    });
    this.dialogRef.close();
  }

  ninReg2() {
    const accepted_data = {
      type: '',
      v_type: '',
      payer_type: 'individual',
    };
    this.snackBar.dismiss();
    this.shared.setPayerMessage(accepted_data);
    this.router.navigate(['/dashboard/dashboard22/taxpayer/ind/individual']);
    this.dialogRef.close();
  }

  ninReg3() {
    this.dialogRef.close();
    this.dialog.open(TaxpayerDialogComponent, {
      data: {
        type: 'nin-regis',
      },
    });
    this.shared.sendchangeRegTypeClickEvent();
  }

  ngOnInit(): void {
    console.log();
  }
}
