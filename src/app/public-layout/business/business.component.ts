import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReplaySubject, Subject, filter, tap, takeUntil, debounceTime, map, delay } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Location, DatePipe } from '@angular/common';
import { Business, CAC, Individual1, Individual2, Individual3, LGA, lgaLogo, NIN, STATE, stateLogo } from '../shared/form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
// state management
import { Store } from '@ngrx/store';
import { States } from '../../models/irm';
import { AppState, selectAllStates } from 'src/app/reducers/index';
import { AddStates } from '../../actions/irm.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;
  @ViewChild('fform1') feedbackFormDirective1: any;
  @ViewChild('fform2') feedbackFormDirective2: any;
  @ViewChild('fform3') feedbackFormDirective3: any;
  @ViewChild('fform4') feedbackFormDirective4: any;

  ninForm: any = FormGroup;
  feedbackForm: any = FormGroup;
  feedbackForm1: any = FormGroup;
  feedbackForm2: any = FormGroup;
  feedbackForm3: any = FormGroup;
  feedback!: CAC;
  ninfeedback!: NIN;
  loading = false;
  disabled = false;
  ninloading = false;
  nindisabled = false;

  floatLabelControl = new FormControl('employed');
  feedback1!: Individual1;
  feedback2!: Individual2;
  feedback3!: Business;

  loading2 = false;
  disabled2 = false;

  bankCtrl: FormControl = new FormControl();
  bankCtrl2: FormControl = new FormControl();
  bankCtrl3: FormControl = new FormControl();
  bankCtrl4: FormControl = new FormControl();
  bankCtrl5: FormControl = new FormControl();
  bankCtrl6: FormControl = new FormControl();
  filteredBanks: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(1);
  filteredBanks2: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);
  filteredBanks3: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(1);
  filteredBanks4: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);
  filteredBanks5: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(1);
  filteredBanks6: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);
  option = STATE;
  options2 = LGA;
  option2 = STATE;
  options3 = LGA;
  option3 = STATE;
  options4 = LGA;
  searching = false;
  searching2 = false;
  searching3 = false;
  searching4 = false;
  searching5 = false;
  searching6 = false;
  searchError!: string;
  searchError2!: string;
  searchErro3!: string;
  protected _onDestroy = new Subject<void>();
  stateError: boolean = false;
  stateError2: boolean = false;
  stateError3: boolean = false;
  stateLoading = false;
  stateLoading2 = false;
  stateLoading3 = false;
  lgaError: boolean = false;
  lgaError2: boolean = false;
  lgaError3: boolean = false;
  lgaLoading = false;
  lgaLoading2 = false;
  lgaLoading3 = false;
  state: any;
  state2: any;
  state3: any;
  lga: any;
  lga2: any;
  lga3: any;

  stateStates: Observable<States[]>;

  formErrors: any = {
    'firstname': '', 'middlename': '', 'surname': '', 'gender': '', 'birth': '', 'place': '',
    'state': '', 'lga': '', 'nationality': '', 'trade': '', 'employment': '', 'contact': '',
    'contact_email': '', 'house': '', 'street': '', 'state_red': '', 'lga_red': '', 'zipcode': '',
    'username': '', 'org_name': '', 'nature_bus': '', 'num_emp': '', 'date_est': '', 'contact_num': '',
    'email': ''
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
      'pattern':         'Not a valid email.',
      'email':         'Not a valid email.'
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

    'org_name': {
      'required':      'required.',
    },
    'nature_bus': {
      'required':      'required.',
    },
    'num_emp': {
      'required':      'required.',
    },
    'date_est': {
      'required':      'required.',
    },
    'contact_num': {
      'required':      'required.',
    },
    'email': {
      'required':      'required.',
      'pattern':         'Not a valid email.',
      'email':         'Not a valid email.'
    },
  };


  constructor(private fb: FormBuilder, private _location: Location, public datepipe: DatePipe,
    private httpService: HttpService, private snackBar: MatSnackBar,
    private authService: AuthService, private store: Store<AppState>) {
    this.createForm();
    this.createForm1();
    this.createForm2();
    this.createForm3();
    this.nForm();
    this.trackCountryField();
    this.trackCountryField2();
    this.stateStates = store.select(selectAllStates);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
        cac: ['']
      },
    );
    this.feedbackForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  nForm() {
    this.ninForm = this.fb.group({
        nin: ['']
      },
    );
    this.ninForm.valueChanges
      .subscribe((data: any) => this.onValueChanged4(data));
    this.onValueChanged4(); // (re)set validation messages now
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
        contact_email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')] ],
        username: ['', [Validators.required] ],
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
        org_name: ['', [Validators.required]],
        nature_bus: ['', [Validators.required]],
        num_emp: ['', [Validators.required]],
        date_est: ['', [Validators.required]],
        contact_num: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
        alt_num: [''],
        website: [''],
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


  onValueChanged4(data?: any) {
    if (!this.ninForm) { return; }
    const form = this.ninForm;
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
        cac: this.feedback.cac,
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


  onSubmit2() {
    this.ninloading = true
    this.nindisabled = true
    this.ninfeedback = this.ninForm.value;
    console.log(this.ninfeedback)
  }


  RemoveFormData() {
      this.feedbackForm1.get('firstname').reset();
      this.feedbackForm1.get('middlename').reset();
      this.feedbackForm1.get('surname').reset();
      this.feedbackForm1.get('gender').reset();
      this.feedbackForm1.get('birth').reset();
      this.feedbackForm1.get('place').reset();
      this.feedbackForm1.get('nationality').reset();
      this.feedbackForm1.get('trade').reset();
      this.feedbackForm1.get('employment').reset();
      this.feedbackForm1.get('contact').reset();
      this.feedbackForm1.get('contact_email').reset();
      this.feedbackForm1.get('title').reset();
      this.feedbackForm2.get('street').reset();
      this.feedbackForm2.get('house').reset();
      this.feedbackForm2.get('zipcode').reset();
      this.feedbackForm3.get('org_name').reset();
      this.feedbackForm3.get('nature_bus').reset();
      this.feedbackForm3.get('num_emp').reset();
      this.feedbackForm3.get('date_est').reset();
      this.feedbackForm3.get('website').reset();
      this.feedbackForm3.get('contact_num').reset();
      this.feedbackForm3.get('email').reset();
      this.feedbackForm3.get('alt_num').reset();
      this.feedbackForm1.get('username').reset();
  }


  Submit() {
    this.loading2 = true
    this.disabled2 = true

    this.feedback1 = this.feedbackForm1.value
    this.feedback2 = this.feedbackForm2.value
    this.feedback3 = this.feedbackForm3.value
    let data = {
        payer: {
            address_state: this.feedback2.state_red,
            address_lga: this.feedback2.lga_red
        },
        directors_info: {
          first_name: this.feedback1.firstname, middle_name: this.feedback1.middlename,
          surname: this.feedback1.surname, dob: this.datepipe.transform(this.feedback1.birth, 'yyyy-MM-dd'), 
          pob: this.feedback1.place, state_origin: this.feedback1.state, lga_origin: this.feedback1.lga,
          nationality: this.feedback1.nationality, profession_trade: this.feedback1.trade,
          employment_category: this.feedback1.employment,  dir_phone: this.feedback1.contact, 
          dir_email: this.feedback1.contact_email, gender: this.feedback1.gender
        },
        organisation_name: this.feedback3.org_name, business_nature: this.feedback3.nature_bus,
        number_employee: this.feedback3.num_emp, establishment_date: this.datepipe.transform(this.feedback3.date_est, 'yyyy-MM-dd'),
        office_website_url: this.feedback3.website || "", org_phone: this.feedback3.contact_num,
        org_email: this.feedback3.email, alt_phone: this.feedback3.alt_num || "",
        address: this.feedback2.street, house_no: this.feedback2.house, zipcode: this.feedback2.zipcode,
    }
    console.log(data)

    this.httpService.AddPayer(data, this.feedback1.username, 'company').subscribe(
      (data: any) => {
        this.loading2 = false;
        this.disabled2 = false;
        if (data.responsecode === "00") {
          this.snackBar.open('Registration successful', "", {
            duration: 3000,
            panelClass: "success"
          });
          this.RemoveFormData();
        }
        else {
          this.snackBar.open(data.message || "error", "", {
            duration: 3000,
            panelClass: "error"
          });
        }
        
      },
      (err: any) => {
        console.log(err)
        this.loading2 = false;
        this.disabled2 = false;
        this.snackBar.open(err.error.message || "error", "", {
          duration: 5000,
          panelClass: "error"
        });
      }
    )


  }


  back() {
    this._location.back();
  }


  trackCountryField(): void {
    this.feedbackForm1.get('state')
      .valueChanges
      .subscribe((field: string) => {
        if(field === undefined) {
        }else {
          let coun = this.state.filter((name: any) => name.id===field )
          this.lga = coun[0]
          this.AddLga(coun[0].id);
        }
      }); 
  }

  trackCountryField2(): void {
    this.feedbackForm2.get('state_red')
      .valueChanges
      .subscribe((field: string) => {
        if(field === undefined) {
        }else {
          let coun = this.state2.filter((name: any) => name.id===field )
          this.lga2 = coun[0]
          this.AddLga2(coun[0].id);
        }
      }); 
  }


  AddState() {
    this.stateLoading = true;
    this.stateLoading2 = true;
    this.stateLoading3 = true;
    this.stateStates.forEach(e => {
      if(e.length > 0 ) {
        this.option = e[0].data.data;
        this.state = e[0].data.data;
        this.state2 = e[0].data.data;
        this.state3 = e[0].data.data;
        this.filteredBanks.next(e[0].data.data);
        this.filteredBanks3.next(e[0].data.data);
        this.filteredBanks5.next(e[0].data.data);
        this.stateLoading = false;
        this.stateLoading2 = false;
        this.stateLoading3 = false;
      }
      else {
        this.httpService.state('state', 1).subscribe(
          (data:any) => {
            if(data.responsecode == "01"){
            }else{
              this.option = data.data;
              this.state = data.data;
              this.state2 = data.data;
              this.state3 = data.data;
              this.filteredBanks.next(data.data);
              this.filteredBanks3.next(data.data);
              this.filteredBanks5.next(data.data);
              this.stateLoading = false;
              this.stateLoading2 = false;
              this.stateLoading3 = false;
              this.store.dispatch(new AddStates([{id: 1, data: data}]));
            }
          },
          err => {
            this.stateLoading = false;
            this.stateLoading2 = false;
            this.stateLoading3 = false;
            this.stateError = true;
            this.stateError3 = true;
            this.stateError3 = true;
          }
        )
      }
    }) 
    // end of state
  }


  AddLga(id: number) {
    this.lgaLoading = true;
    this.httpService.state('lga', id)
    .subscribe(
      (data: any) => {
        this.options2 = data.data;
        this.filteredBanks2.next(data.data);
        this.lgaLoading = false;
      },
      (err: any) => {
        this.lgaLoading = false;
        this.lgaError = true;
      }
    )
  }

  AddLga2(id: number) {
    this.lgaLoading2 = true;
    this.httpService.state('lga', id)
    .subscribe(
      (data: any) => {
        this.options3 = data.data;
        this.filteredBanks4.next(data.data);
        this.lgaLoading2 = false;
      },
      (err: any) => {
        this.lgaLoading2 = false;
        this.lgaError2 = true;
      }
    )
  }


  ngOnInit(): void {

    this.authService.checkExpired();
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


        // second layer

      this.bankCtrl3.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching3 = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(searchC => {
          const filterValue = searchC.toLowerCase();
          if (!this.option2) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.option.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.option2.filter((bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1);
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(filteredBanks => {
        this.searching3 = false;
        this.filteredBanks3.next(filteredBanks);
      },
        error => {
          // no errors in our simulated example
          this.searching3 = false;
          // handle error...
        });


      // 4
      this.bankCtrl4.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching4 = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(searchC => {
          const filterValue = searchC.toLowerCase();
          if (!this.options3) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.options2.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.options3.filter((bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1);
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(filteredBanks4 => {
        this.searching4 = false;
        this.filteredBanks4.next(filteredBanks4);
      },
        error => {
          // no errors in our simulated example
          this.searching4 = false;
          // handle error...
        });
        
  }

}
