import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { direct_boj2 } from '../../shared/form';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MatDialog } from '@angular/material/dialog';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-direct-self',
  templateUrl: './direct-self.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-self.component.scss'],
})
export class DirectSelfComponent implements OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: direct_boj2;
  loading = false;
  disabled = false;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  form2!: FormGroup;
  form3!: FormGroup;
  hmo!: string;
  other!: string;

  formData = new FormData();
  fileName = '';

  formErrors: any = {
    source: '',
    income: '',
    year: '',
  };

  validationMessages: any = {
    source: {
      required: 'required.',
    },
    income: {
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
    private dialog: MatDialog
  ) {
    this.authService.checkExpired();
    this.createForm();
    this.createForm2();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      source: ['', [Validators.required]],
      income: ['', [Validators.required]],
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

  createForm2() {
    this.form2 = this.fb.group({
      floatLabelControl2: [{ value: 'true', disabled: false }],
    });
    this.form3 = this.fb.group({
      floatLabelControl3: [{ value: 'true', disabled: false }],
    });
  }

  checkValidity() {
    const feed1 = this.feedbackFormDirective.invalid;
    const control = this.feedbackFormDirective.form.controls;
    if (feed1) {
      if (control.source.status == 'INVALID') {
        this.formErrors['source'] = 'required.';
      }
      if (control.income.status == 'INVALID') {
        this.formErrors['income'] = 'required.';
      }
      if (control.year.status == 'INVALID') {
        this.formErrors['year'] = 'required.';
      }
    }
  }

  onSubmit() {
    this.checkValidity();
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading = true;
      this.disabled = true;

      this.feedback = this.feedbackForm.value;

      let data = {
        source: this.feedback.source,
        income: this.feedback.income,
        year: this.feedback.year,
      };
      console.log(data);

      // this.httpService.postData(BaseUrl.add_com_payer, data).subscribe(
      //   (data: any) => {
      //     this.loading = false;
      //     this.disabled = false;
      //     // this.snackBar.open('Registration successful', '', {
      //     //   duration: 3000,
      //     //   panelClass: 'success',
      //     //   horizontalPosition: 'center',
      //     //   verticalPosition: 'top',
      //     // });\
      //     this.feedbackFormDirective.resetForm()
      //     let datas2: any = [];
      //     this.stateComPayer.forEach((e) => {
      //       if (e.length > 0) {
      //         let datas = Object.assign([], e[0].data);
      //         datas.unshift(data.data);
      //         datas2 = datas;
      //       }
      //     });
      //     this.store.dispatch(new RemoveComPayer([{ id: 1, data: [] }]));
      //     this.store.dispatch(new AddComPayer([{ id: 1, data: datas2 }]));
      //     this.router.navigate(['/dashboard/dashboard2/taxpayer']);
      //     this.OpenDialog(data.data);
      //   },
      //   (err: any) => {
      //     console.log(err);
      //     this.loading2 = false;
      //     this.disabled2 = false;
      //     this.snackBar.open(
      //       err?.error?.msg || err?.error?.detail || 'An Error Occured!',
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

  initAnimations(): void {
    gsap.from(this.card.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      y: 40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  ngOnInit(): void {
    this.initAnimations();
    this.filteredOptions = this.feedbackForm.get('source').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.formData = formData;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
