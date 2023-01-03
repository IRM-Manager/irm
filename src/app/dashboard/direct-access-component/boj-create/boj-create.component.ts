import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { directAss } from '../../shared/form';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddYear } from 'src/app/actions/irm.action';
import { AppState, selectAllYear } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { Year } from '../../models/irm';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';
import { DirectServiceService } from '../service/direct-service.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-boj-create',
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
    FlexLayoutModule,
  ],
  templateUrl: './boj-create.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./boj-create.component.scss'],
})
export class BojCreateComponent implements OnInit {
  @ViewChild('fform2') feedbackFormDirective2: any;
  loading = false;
  disabled = false;
  update = false;
  datas: any;
  years: any;
  formData = new FormData();
  image: any;
  filename: any;
  // 2
  formData2 = new FormData();
  image2: any;
  filename2: any;
  collectedSourceData: any = [];
  collectedDeductionData: any = [];
  totalValue: any;
  feedbackForm2: any = FormGroup;
  feedback2!: directAss;
  clickEventSubscription?: Subscription;
  stateYear: Observable<Year[]>;

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

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService,
    private authService: AuthService,
    private service: DirectServiceService,
    private dialog: MatDialog
  ) {
    this.createForm2();
    this.stateYear = store.select(selectAllYear);
    //
    this.datas = this.service.getMessage();
    console.log(this.datas);
    if (this.datas) {
      if (this.datas.update) {
        this.update = true;
        this.updateValue();
      } else {
      }
    } else {
      this.router.navigate([`/dashboard/dashboard5/direct/obj`]);
    }
    //
    this.listYear();
  }

  createForm2() {
    this.feedbackForm2 = this.fb.group({
      year: ['', [Validators.required]],
      source: [''],
      amount: [''],
      deduction: [''],
      amount2: [''],
      agree: [false, [Validators.required]],
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

  updateValue() {
    this.feedbackForm2.patchValue({ agree: true });
    this.feedbackForm2.patchValue({
      year: this.datas.data.year_id,
    });
    this.collectedSourceData = this.datas.data.incomes;
    this.collectedDeductionData = this.datas.data.deductions;
    this.sumValue();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      const formData = new FormData();
      formData.append('file', file);
      this.formData = formData;
      this.filename = file.name;
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.image = (<FileReader>event.target).result;
      };
    }
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      const formData2 = new FormData();
      formData2.append('file', file);
      this.formData = formData2;
      this.filename2 = file.name;
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.image2 = (<FileReader>event.target).result;
      };
    }
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  addSource() {
    this.snackBar.dismiss();
    this.feedback2 = this.feedbackForm2.value;
    const get_source = this.collectedSourceData.filter((name: any) => {
      return (
        name?.sources?.toLowerCase() == this.feedback2?.source?.toLowerCase()
      );
    });
    if (get_source.length !== 0) {
      this.snackBar.open(`${this.feedback2.source} already exists!`, '', {
        duration: 3000,
        panelClass: 'warning',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      if (this.feedback2.amount && this.feedback2.source) {
        const data = {
          sources: this.feedback2.source,
          income: this.feedback2.amount,
          fileName: this.filename,
          doc: this.image || '',
        };
        this.collectedSourceData.push(data);
        this.feedbackForm2.controls['source'].reset();
        this.feedbackForm2.controls['amount'].reset();
        this.filename = '';
        this.image = '';
      } else {
        this.snackBar.open('Complete the fields', '', {
          duration: 3000,
          panelClass: 'warning',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      this.sumValue();
    }
  }

  deleteSource(id: number) {
    this.collectedSourceData.splice(id, 1);
    this.sumValue();
  }
  //
  addDeduction() {
    this.snackBar.dismiss();
    this.feedback2 = this.feedbackForm2.value;
    const get_source = this.collectedDeductionData.filter((name: any) => {
      return (
        name?.sources?.toLowerCase() == this.feedback2?.deduction?.toLowerCase()
      );
    });
    if (get_source.length !== 0) {
      this.snackBar.open(`${this.feedback2.deduction} already exists!`, '', {
        duration: 3000,
        panelClass: 'warning',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      if (this.feedback2.amount2 && this.feedback2.deduction) {
        const data = {
          sources: this.feedback2.deduction,
          amount: this.feedback2.amount2,
          fileName: this.filename2,
          doc: this.image2 || '',
        };
        this.collectedDeductionData.push(data);
        this.feedbackForm2.controls['deduction'].reset();
        this.feedbackForm2.controls['amount2'].reset();
        this.filename2 = '';
        this.image2 = '';
      } else {
        this.snackBar.open('Complete the fields', '', {
          duration: 3000,
          panelClass: 'warning',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      this.sumValue();
    }
  }

  deleteDeduction(id: number) {
    this.collectedDeductionData.splice(id, 1);
    this.sumValue();
  }

  onSubmit() {
    this.feedback2 = this.feedbackForm2.value;
    this.onValueChanged2();
    const feed1 = this.feedbackFormDirective2.invalid;
    if (feed1) {
      this.snackBar.open('Errors in fields please check it out.', '', {
        duration: 5000,
        panelClass: 'warning',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else if (
      this.collectedDeductionData.length < 1 ||
      this.collectedSourceData.length < 1
    ) {
      this.snackBar.open('Income or Deduction not added yet', '', {
        duration: 5000,
        panelClass: 'warning',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.loading = true;
      this.disabled = true;
      this.collectedSourceData.filter((name: any) => {
        delete name.fileName;
      });
      this.collectedDeductionData.filter((name: any) => {
        delete name.fileName;
      });
      const data = {
        tin: this.datas.data.state_tin,
        incomes: this.collectedSourceData,
        deductions: this.collectedDeductionData,
        year_id: this.feedback2.year,
      };
      console.log(data);
      this.httpService
        .postData(BaseUrl.list_boj + `?item_id=2`, data)
        .subscribe(
          (data: any) => {
            this.service.setBYearMessage({
              yearId: data.data.assessment.assessment_year,
            });
            this.loading = false;
            console.log(data);
            this.openDialog('', 'success');
            this.service.setviewSelfMessage(data.data);
            this.router.navigate(['/dashboard/dashboard5/direct/history/view']);
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            this.disabled = false;
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

  updateData() {
    this.feedback2 = this.feedbackForm2.value;
    this.onValueChanged2();
    const feed1 = this.feedbackFormDirective2.invalid;
    if (feed1) {
      this.snackBar.open('Errors in fields please check it out.', '', {
        duration: 5000,
        panelClass: 'warning',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else if (
      this.collectedDeductionData.length < 1 ||
      this.collectedSourceData.length < 1
    ) {
      this.snackBar.open('Income or Deduction not added yet', '', {
        duration: 5000,
        panelClass: 'warning',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.loading = true;
      this.disabled = true;
      this.collectedSourceData.filter((name: any) => {
        delete name.fileName;
        if (!name.doc) {
          name['doc'] = '';
        }
      });
      this.collectedDeductionData.filter((name: any) => {
        delete name.fileName;
        if (!name.doc) {
          name['doc'] = '';
        }
      });
      const data = {
        tin: this.datas.data.payer.state_tin,
        incomes: this.collectedSourceData,
        deductions: this.collectedDeductionData,
        year_id: this.feedback2.year,
      };
      console.log(data);
      this.httpService
        .updateData(BaseUrl.list_boj, data, `${this.datas.data.id}/`)
        .subscribe(
          (data: any) => {
            this.service.setBYearMessage({
              yearId: data.data.assessment.assessment_year,
            });
            this.loading = false;
            console.log(data);
            this.service.setviewSelfMessage(data.data);
            this.snackBar.open('Update Successful', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate(['/dashboard/dashboard5/direct/history/view']);
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            this.disabled = false;
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

  sumValue() {
    let source: any = this.collectedSourceData.reduce(
      (accumulator: any, current: any) => accumulator + current.income,
      0
    );
    let deduction: any = this.collectedDeductionData.reduce(
      (accumulator: any, current: any) => accumulator + current.amount,
      0
    );
    this.totalValue = source + deduction;
  }

  limit(title: any, limit = 20) {
    if (title === undefined) {
      return '';
    } else {
      const newTitle: any = [];
      if (title.length > limit) {
        title.split('').reduce((acc: any, cur: any) => {
          if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
          return acc + cur.length;
        }, 0);
        return `${newTitle.join('')}...`;
      }
      return title;
    }
  }

  listYear() {
    this.stateYear?.forEach((e) => {
      if (e.length > 0) {
        this.years = e[0].data;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            this.years = data.results;
            this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
          },
          (err) => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  ngOnInit(): void {
    console.log();
  }
}
