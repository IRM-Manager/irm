import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { directAss } from '../../shared/form';

@Component({
  selector: 'app-boj-create',
  templateUrl: './boj-create.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./boj-create.component.scss'],
})
export class BojCreateComponent implements OnInit {
  @ViewChild('fform2') feedbackFormDirective2: any;

  loading = false;
  disabled = false;
  datas: any;

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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.createForm2();
  }

  createForm2() {
    this.feedbackForm2 = this.fb.group({
      year: ['', [Validators.required]],
      source: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      deduction: ['', [Validators.required]],
      amount2: ['', [Validators.required]],
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
    this.feedback2 = this.feedbackForm2.value;
    if (this.feedback2.amount && this.feedback2.source) {
      const data = {
        source: this.feedback2.source,
        amount: this.feedback2.amount,
        fileName: this.filename,
        image: this.image,
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

  deleteSource(id: number) {
    this.collectedSourceData.splice(id, 1);
    this.sumValue();
  }
  //
  addDeduction() {
    this.feedback2 = this.feedbackForm2.value;
    if (this.feedback2.amount2 && this.feedback2.deduction) {
      const data = {
        deduction: this.feedback2.deduction,
        amount: this.feedback2.amount2,
        fileName: this.filename2,
        image: this.image2,
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

  deleteDeduction(id: number) {
    this.collectedDeductionData.splice(id, 1);
    this.sumValue();
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

  sumValue() {
    let source: any = this.collectedSourceData.reduce(
      (accumulator: any, current: any) => accumulator + current.amount,
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

  ngOnInit(): void {}
}
