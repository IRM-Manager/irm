import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { MDA } from '../../shared/form';
import { MdaDialogComponent } from '../mda-dialog/mda-dialog.component';
import { MdaServiceService } from '../service/mda-service.service';

@Component({
  selector: 'app-mda',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './mda.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./mda.component.scss'],
})
export class MDAComponent implements OnInit {
  @ViewChild('fform3') feedbackFormDirective3: any;
  feedbackForm3: any = FormGroup;
  feedback3!: MDA;
  loading2 = false;
  disabled2 = false;
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  options2: string[] = [];
  filteredOptions2: Observable<string[]> | undefined;
  datas: any;
  mdaList: any;
  mdaLoading = false;
  mdaError = false;
  currentMdaRev: any;

  formErrors: any = {
    firstname: '',
    surname: '',
    contact: '',
    contact_email: '',
    mda_name: '',
    service_name: '',
  };

  validationMessages: any = {
    firstname: {
      required: 'required.',
    },
    surname: {
      required: 'required.',
    },
    mda_name: {
      required: 'required.',
    },
    service_name: {
      required: 'required.',
    },
    contact: {
      required: 'required.',
    },
    contact_email: {
      required: 'required.',
      pattern: 'Not a valid email.',
      email: 'Not a valid email.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private service: MdaServiceService
  ) {
    this.authService.checkExpired();
    this.datas = this.service.getMessage();

    if (this.datas?.type == 'mda') {
    } else {
      this.router.navigate([`/dashboard/dashboard3/mda`]);
    }

    this.mdaList = this.service.getMdaMessage();
    if (this.mdaList) {
      this.mdaError = false;
      this.mdaList.filter((name: any) => {
        this.options.push(name?.name);
      });
    } else {
      this.mdaError = true;
    }

    this.createForm3();
    this.feedbackForm3.patchValue({ firstname: this.datas?.data.first_name });
    this.feedbackForm3.patchValue({ surname: this.datas?.data.surname });
    this.feedbackForm3.patchValue({ contact: this.datas?.data.phone });
    this.feedbackForm3.patchValue({ contact_email: this.datas?.data.email });
    this.feedbackForm3.controls['firstname'].disable();
    this.feedbackForm3.controls['surname'].disable();
    this.feedbackForm3.controls['contact'].disable();
    this.feedbackForm3.controls['contact_email'].disable();
  }

  createForm3() {
    this.feedbackForm3 = this.fb.group({
      firstname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
      mda_name: ['', [Validators.required]],
      service_name: ['', [Validators.required]],
      amount: [''],
    });

    this.feedbackForm3.valueChanges.subscribe((data: any) =>
      this.onValueChanged3(data)
    );
    this.onValueChanged3(); // (re)set validation messages now
  }

  onValueChanged3(data?: any) {
    if (!this.feedbackForm3) {
      return;
    }
    const form = this.feedbackForm3;
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
    this.onValueChanged3();
    const feed = this.feedbackFormDirective3.invalid;
    if (feed) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading2 = true;
      this.disabled2 = true;
      this.feedback3 = this.feedbackForm3.getRawValue();
      let http_data: any;
      this.currentMdaRev.filter((name: any) => {
        if (name?.name == this.feedback3.service_name) {
          http_data = name;
        }
      });
      console.log(this.feedback3);
      this.httpService
        .postData(BaseUrl.mda_genetae_bill + this.datas?.data.state_tin, {
          item_id: http_data?.mdaid?.id,
          amount: this.feedback3.amount,
        })
        .subscribe(
          (data: any) => {
            console.log(data.data);
            this.openDialog(data?.data, 'generate_bill');
            this.router.navigate(['/dashboard/dashboard3/mda/bill']);
          },
          (err) => {
            this.authService.checkExpired();
            this.loading2 = false;
            this.disabled2 = false;
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

  getMdaRev(search: string) {
    let id = '';
    this.mdaList.filter((name: any) => {
      if (name?.name == search) {
        id = name?.id;
      }
    });
    this.httpService
      .getAuthSingle(BaseUrl.rev_mda + id)
      .subscribe((data: any) => {
        this.currentMdaRev = data?.data;
        data?.data.filter((name: any) => {
          this.options2.push(name?.name);
        });
        this.filteredOptions2 = this.feedbackForm3
          .get('service_name')
          .valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter2(value))
          );
      });
  }

  getRevMdaAmt(search: string) {
    this.currentMdaRev.filter((name: any) => {
      if (name?.name == search) {
        this.feedbackForm3.patchValue({ amount: name?.amount });
        this.feedbackForm3.controls['amount'].disable();
      }
    });
  }

  saveMda() {
    this.mdaLoading = true;
    this.mdaError = false;
    this.httpService.getAuthSingle(BaseUrl.mda_list).subscribe(
      (data: any) => {
        this.mdaLoading = false;
        this.mdaError = false;
        this.mdaList = data?.data;
        data?.data.filter((name: any) => {
          this.options.push(name?.name);
        });
        this.filteredOptions = this.feedbackForm3
          .get('mda_name')
          .valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value))
          );
      },
      () => {
        this.mdaLoading = false;
        this.mdaError = true;
      }
    );
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.filteredOptions = this.feedbackForm3.get('mda_name').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );

    this.filteredOptions2 = this.feedbackForm3
      .get('service_name')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this._filter2(value))
      );
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(MdaDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filter2(value: string): string[] {
    const filterValue2 = value.toLowerCase();
    return this.options2.filter((option) =>
      option.toLowerCase().includes(filterValue2)
    );
  }
}
