import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { MDA, Tin } from '../../shared/form';

@Component({
  selector: 'app-mda',
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

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  options2: string[] = ['One', 'Two', 'Three'];
  filteredOptions2: Observable<string[]> | undefined;

  formErrors: any = {
    firstname: '',
    middlename: '',
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
    middlename: {
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
    private authService: AuthService
  ) {
    this.authService.checkExpired();
    this.createForm3();
    this.feedbackForm3.controls['amount'].disable();
  }

  createForm3() {
    this.feedbackForm3 = this.fb.group({
      title: [''],
      firstname: ['', [Validators.required]],
      middlename: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
      mda_name: ['', [Validators.required]],
      service_name: ['', [Validators.required]],
      amount: [''],
      amount2: [''],
      description: [''],
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

  // RemoveFormData() {
  //   this.feedbackForm3.get('firstname').reset();
  //   this.feedbackForm3.get('middlename').reset();
  //   this.feedbackForm3.get('surname').reset();
  //   this.feedbackForm3.get('title').reset();
  //   this.feedbackForm3.get('mda_name').reset();
  //   this.feedbackForm3.get('service_name').reset();
  //   this.feedbackForm3.get('amount').reset();
  //   this.feedbackForm3.get('description').reset();
  //   this.feedbackForm3.get('contact').reset();
  //   this.feedbackForm3.get('contact_email').reset();
  // }


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
      this.feedback3 = this.feedbackForm3.value;
      // this.feedbackFormDirective3.resetForm();
      console.log(this.feedback3);
    }
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
