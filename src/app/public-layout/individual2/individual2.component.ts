import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Individual1, Individual2, Individual3, LGA, lgaLogo, NIN, STATE, stateLogo } from '../shared/form';
import {Location} from '@angular/common';
import { debounceTime, delay, filter, map, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-individual2',
  templateUrl: './individual2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./individual2.component.scss']
})
export class Individual2Component implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;
  @ViewChild('fform1') feedbackFormDirective1: any;
  @ViewChild('fform2') feedbackFormDirective2: any;
  @ViewChild('fform3') feedbackFormDirective3: any;

  feedbackForm: any = FormGroup;
  feedbackForm1: any = FormGroup;
  feedbackForm2: any = FormGroup;
  feedbackForm3: any = FormGroup;
  feedback!: NIN;
  loading = false;
  disabled = false;

  floatLabelControl = new FormControl('employed');
  feedback1!: Individual1;
  feedback2!: Individual2;
  feedback3!: Individual3;

  loading2 = false;
  disabled2 = false;

  bankCtrl: FormControl = new FormControl();
  bankCtrl2: FormControl = new FormControl();
  filteredBanks: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(1);
  filteredBanks2: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);
  option = STATE;
  options2 = LGA;
  searching = false;
  searching2 = false;
  searchError!: string;
  protected _onDestroy = new Subject<void>();
  stateError: boolean = false;
  stateLoading = false;

  formErrors: any = {
    'firstname': '', 'middlename': '', 'surname': '', 'gender': '', 'birth': '', 'place': '',
    'state': '', 'lga': '', 'nationality': '', 'trade': '', 'employment': '', 'contact': '',
    'contact_email': '', 'house': '', 'street': '', 'state_red': '', 'lga_red': '', 'zipcode': '',
    'username': '',
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
    'gender': {
      'required':      'required.',
    },
    'birth': {
      'required':      'required.',
    },
    'place': {
      'required':      'required.',
    },
    'state': {
      'required':      'required.',
    },
    'lga': {
      'required':      'required.',
    },
    'nationality': {
      'required':      'required.',
    },
    'trade': {
      'required':      'required.',
    },
    'employment': {
      'required':      'required.',
    },
    'contact': {
      'required':      'required.',
    },
    'contact_email': {
      'required':      'required.',
      'pattern':         'email not in valid format.'
    },
    'house': {
      'required':      'required.',
    },
    'street': {
      'required':      'required.',
    },
    'state_red': {
      'required':      'required.',
    },
    'lga_red': {
      'required':      'required.',
    },
    'zipcode': {
      'required':      'required.',
    },
    'username': {
      'required':      'required.',
    },
  };


  constructor(private fb: FormBuilder, private _location: Location,
    private httpService: HttpService) {
    this.createForm();
    this.createForm1();
    this.createForm2();
    this.createForm3();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
        nin: ['']
      },
    );

    this.feedbackForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  createForm1() {
    this.feedbackForm1 = this.fb.group({
        title: ['', [Validators.required] ],
        firstname: ['', [Validators.required] ],
        middlename: ['', [Validators.required] ],
        surname: ['', [Validators.required] ],
        gender: ['', [Validators.required] ],
        birth: ['', [Validators.required] ],
        place: ['', [Validators.required] ],
        state: ['', [Validators.required] ],
        lga: ['', [Validators.required] ],
        nationality: ['', [Validators.required] ],
        trade: ['', [Validators.required] ],
        employment: ['', [Validators.required] ],
        contact: ['', [Validators.required] ],
        contact_email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')] ],
      },
    );

    this.feedbackForm1.valueChanges
      .subscribe((data: any) => this.onValueChanged1(data));
    this.onValueChanged1(); // (re)set validation messages now
  }

  createForm2() {
    this.feedbackForm2 = this.fb.group({
        house: ['', [Validators.required] ],
        street: ['', [Validators.required] ],
        state_red: ['', [Validators.required] ],
        lga_red: ['', [Validators.required] ],
        zipcode: ['', [Validators.required] ],
      },
    );

    this.feedbackForm2.valueChanges
      .subscribe((data: any) => this.onValueChanged2(data));
    this.onValueChanged2(); // (re)set validation messages now
  }


  createForm3() {
    this.feedbackForm3 = this.fb.group({
        com_name: [''],
        com_house: [''],
        company_street: [''],
        com_country: [''],
        com_state: [''],
        com_lga: [''],
        com_zipcode: [''],
        username: [''],
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

  onValueChanged1(data?: any) {
    if (!this.feedbackForm1) { return; }
    const form = this.feedbackForm1;
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

  onValueChanged2(data?: any) {
    if (!this.feedbackForm2) { return; }
    const form = this.feedbackForm2;
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
    this.disabled = true
    this.feedback = this.feedbackForm.value;

    const data = {
        cac: this.feedback.nin,
    }
    console.log(this.feedback)
    // perform login
    // this.authService.login(user)
    // .subscribe(
    //   (data: any) => {
    //     this.loading = false
    //     this.disabled = false;
    //     if (data) {
    //       this.router.navigate(['/dashboard']);
    //       this.snackBar.open('success', "", {
    //         duration: 3000,
    //         panelClass: "success"
    //       });
    //     }

    //   }
    // )
    // end of subscribe
  }

  Submit() {
    console.log(this.floatLabelControl.value)
  }

  back() {
    this._location.back();
  }

  AddState() {
    this.stateLoading = true;
    this.httpService.state('state', 1)
    .subscribe(
      (data: any) => {
        this.option = data.data;
        this.stateLoading = false;
      },
      (err: any) => {
        this.stateLoading = false;
        this.stateError = true;
      }
    )
    // end of subscribe

  }

  ngOnInit(): void {

    this.AddState();

    this.bankCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(searchC => {
          const filterValue = searchC.toLowerCase();
          if (!this.option) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.option.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.option.filter((bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1);
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(filteredBanks => {
        this.searching = false;
        this.filteredBanks.next(filteredBanks);
      },
        error => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        });


      // 2
      this.bankCtrl2.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching2 = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(searchC => {
          const filterValue = searchC.toLowerCase();
          if (!this.options2) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.options2.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.options2.filter((bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1);
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(filteredBanks => {
        this.searching2 = false;
        this.filteredBanks2.next(filteredBanks);
      },
        error => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        });

        
  }



}
