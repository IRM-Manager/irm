import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Location } from '@angular/common';
import { Tin, MDA } from '../shared/form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-mda',
  templateUrl: './mda.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./mda.component.scss']
})
export class MDAComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;
  @ViewChild('fform3') feedbackFormDirective3: any;

  feedbackForm: any = FormGroup;
  feedbackForm3: any = FormGroup;
  feedback!: Tin;
  feedback3!: MDA;
  loading = false;
  loading2 = false;
  disabled2 = false;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  options2: string[] = ['One', 'Two', 'Three'];
  filteredOptions2: Observable<string[]> | undefined;

  formErrors: any = {
    'firstname': '', 'middlename': '', 'surname': '', 'contact': '', 'contact_email': '', 'mda_name': '',
    'service_name': '', 'amount': '', 'title': '', 
  };


  validationMessages: any = {
    'firstname': {
      'required':      'required.',
    },
    'middlename': {
      'required':      'required.',
    },
    'surname': {
      'required':      'required.',
    },
    'title': {
      'required':      'required.',
    },
    'mda_name': {
      'required':      'required.',
    },
    'service_name': {
      'required':      'required.',
    },
    'amount': {
      'required':      'required.',
    },
    'contact': {
      'required':      'required.',
    },
    'contact_email': {
      'required':      'required.',
      'pattern':         'Not a valid email.',
      'email':         'Not a valid email.'
    }
  };


  constructor(private fb: FormBuilder, private _location: Location,
    private httpService: HttpService, private snackBar: MatSnackBar,
    private authService: AuthService) {
    this.createForm();
    this.createForm3();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
        tin: ['']
      },
    );
    this.feedbackForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }


  createForm3() {
    this.feedbackForm3 = this.fb.group({
      title: ['', [Validators.required] ],
      firstname: ['', [Validators.required] ],
      middlename: ['', [Validators.required] ],
      surname: ['', [Validators.required] ],
      contact: ['', [Validators.required] ],
      contact_email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')] ],
      mda_name: ['', [Validators.required] ],
      service_name: ['', [Validators.required] ],
      amount: ['', [Validators.required] ],
      description: [''],
    },
  );

    this.feedbackForm3.valueChanges
      .subscribe((data: any) => this.onValueChanged3(data));
    this.onValueChanged3(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
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


  onValueChanged3(data?: any) {
    if (!this.feedbackForm3) { return; }
    const form = this.feedbackForm3;
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


  

  onSubmit() {

    this.loading = true
    this.feedback = this.feedbackForm.value;

    this.httpService.GetPayerTin(this.feedback.tin)
    .subscribe(
      (data: any) => {
        console.log(data)
        this.loading = false
        if (data.data.payer.payer_type == "individual") {
          this.feedbackForm3.patchValue({firstname: data.data.first_name});
          this.feedbackForm3.patchValue({middlename: data.data.middle_name});
          this.feedbackForm3.patchValue({surname: data.data.surname});
          this.feedbackForm3.patchValue({contact: data.data.phone});
          this.feedbackForm3.patchValue({contact_email: data.data.email});
          this.feedbackForm3.controls["title"].setValue(data.data.gender == 'male' ? 'mr' : 'mrs');
            this.snackBar.open("Valid", "", {
              duration: 3000,
              panelClass: "success"
            });
        }
        else {
          this.snackBar.open("Not A Registered Individual Taxpayer", "", {
            duration: 5000,
            panelClass: "error"
          });
        }
      },
      err => {
        this.loading = false
        this.authService.refreshToken();
        console.log(err)
        if (err.status === 404) {
          this.snackBar.open("Tin or Reg.No does not exists", "", {
            duration: 5000,
            panelClass: "error"
          });
        }
        else {
          this.snackBar.open('Error', "", {
            duration: 5000,
            panelClass: "error"
          });
        }
      }
    )
    // end of subscribe
  }


  RemoveFormData() {
      this.feedbackForm3.get('firstname').reset();
      this.feedbackForm3.get('middlename').reset();
      this.feedbackForm3.get('surname').reset();
      this.feedbackForm3.get('title').reset();
      this.feedbackForm3.get('mda_name').reset();
      this.feedbackForm3.get('service_name').reset();
      this.feedbackForm3.get('amount').reset();
      this.feedbackForm3.get('description').reset();
      this.feedbackForm3.get('contact').reset();
      this.feedbackForm3.get('contact_email').reset();
  }


  Submit() {
    this.loading2 = true
    this.disabled2 = true
    this.feedback3 = this.feedbackForm3.value
    console.log(this.feedback3)
  }


  ngOnInit(): void {
    this.authService.checkExpired();

    this.filteredOptions = this.feedbackForm3.get('mda_name').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );

    this.filteredOptions2 = this.feedbackForm3.get('service_name').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter2(value)),
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }


}
