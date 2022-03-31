import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Individual1, Individual2, Individual3, LGA, lgaLogo, NIN, STATE, stateLogo } from '../shared/form';
import {Location, DatePipe} from '@angular/common';
import { debounceTime, delay, filter, map, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
// state management
import { Store } from '@ngrx/store';
import { States, Profile } from '../../models/irm';
import { AppState, selectAllStates, selectAllProfile } from 'src/app/reducers/index';
import { AddStates, AddProfile, RemoveIndPayer } from '../../actions/irm.action';
import { Observable } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
import { Router } from '@angular/router';

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
  includedFields: any;

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
  update = false;
  Updateloading = false;
  state: any;
  state2: any;
  state3: any;
  lga: any;
  lga2: any;
  lga3: any;

  editDetails: any;

  stateStates: Observable<States[]>;
  stateProfile: Observable<Profile[]>;

  formErrors: any = {
    'firstname': '', 'middlename': '', 'surname': '', 'gender': '', 'birth': '', 'place': '',
    'state': '', 'lga': '', 'nationality': '', 'trade': '', 'contact': '',
    'contact_email': '', 'house': '', 'street': '', 'state_red': '', 'lga_red': '', 'zipcode': '',
    // 'employment': '',
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
    // 'employment': {
    //   'required':      'required.',
    // },
    'contact': {
      'required':      'required.',
    },
    'contact_email': {
      'required':      'required.',
      'pattern':         'email not in valid format.',
      'email':         'Not a valid email'
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
    }
  };


  constructor(private fb: FormBuilder, private _location: Location, public datepipe: DatePipe,
    private httpService: HttpService, private snackBar: MatSnackBar, private router: Router,
    private authService: AuthService, private store: Store<AppState>,
    public shared: ToggleNavService) {
      this.authService.checkExpired();
      this.createForm();
      this.createForm1();
      this.createForm2();
      this.createForm3();
      this.trackCountryField();
      this.trackCountryField2();
      this.trackCountryField3();
      this.trackEmptyFields();

      this.stateStates = store.select(selectAllStates);
      this.stateProfile = store.select(selectAllProfile);

      this.editDetails = this.shared.getPayerEditMessage();

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
        title: [''],
        firstname: ['', [Validators.required] ],
        middlename: [''],
        surname: ['', [Validators.required] ],
        gender: ['', [Validators.required] ],
        birth: ['', [Validators.required] ],
        place: ['', [Validators.required] ],
        state: ['', [Validators.required] ],
        lga: ['', [Validators.required] ],
        nationality: ['', [Validators.required] ],
        trade: ['', [Validators.required] ],
        // employment: ['', [Validators.required] ],
        contact: ['', [Validators.required] ],
        contact_email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')] ],
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
        company_name: [''],
        company_house_no: [''],
        company_estate_street: [''],
        company_country: [''],
        company_state: [''],
        company_lga: [''],
        company_zipcode: [''],
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

  RemoveFormData() {
      this.floatLabelControl = new FormControl('employed');
      this.feedbackForm1.get('firstname').reset();
      this.feedbackForm1.get('middlename').reset();
      this.feedbackForm1.get('surname').reset();
      this.feedbackForm1.get('gender').reset();
      this.feedbackForm1.get('birth').reset();
      this.feedbackForm1.get('place').reset();
      this.feedbackForm1.get('nationality').reset();
      this.feedbackForm1.get('trade').reset();
      this.feedbackForm1.get('contact').reset();
      this.feedbackForm1.get('contact_email').reset();
      this.feedbackForm1.get('title').reset();
      this.feedbackForm2.get('street').reset();
      this.feedbackForm2.get('house').reset();
      this.feedbackForm2.get('zipcode').reset();
      this.feedbackForm3.get('company_name').reset();
      this.feedbackForm3.get('company_house_no').reset();
      this.feedbackForm3.get('company_estate_street').reset();
      this.feedbackForm3.get('company_zipcode').reset();
      this.feedbackForm3.get('company_country').reset();
  }


  firstnameError = false; surnameError = false; genderError = false; birthError = false;
  placeError = false; nationalityError = false; tradeError = false; contactError = false; contact_emailError = false;
  stateeError = false; lgaaError = false;

  onSubmit1() {
    const feed1 = this.feedbackFormDirective1.invalid
    const control = this.feedbackFormDirective1.form.controls
    if (feed1) {
      if (control.firstname.status == "INVALID") {
        this.firstnameError = true;
        this.formErrors['firstname'] = 'required.';
      }
      else {
        this.firstnameError = false;
      }
      if(control.surname.status == "INVALID") {
        this.surnameError = true;
        this.formErrors['surname'] = 'required.';
      }
      else {
        this.surnameError = false;
      }
      if(control.gender.status == "INVALID") {
        this.genderError = true;
        this.formErrors['gender'] = 'required.';
      }
      else {
        this.genderError = false;
      }
      if(control.birth.status == "INVALID") {
        this.birthError = true;
        this.formErrors['birth'] = 'required.';
      }
      else {
        this.birthError = false;
      }
      if(control.place.status == "INVALID") {
        this.placeError = true;
        this.formErrors['place'] = 'required.';
      }
      else {
        this.placeError = false;
      }
      if(control.nationality.status == "INVALID") {
        this.nationalityError = true;
        this.formErrors['nationality'] = 'required.';
      }
      else {
        this.nationalityError = false;
      }
      if(control.trade.status == "INVALID") {
        this.tradeError = true;
        this.formErrors['trade'] = 'required.';
      }
      else {
        this.tradeError = false;
      }
      if(control.contact.status == "INVALID") {
        this.contactError = true;
        this.formErrors['contact'] = 'required.';
      }
      else {
        this.contactError = false;
      }
      if(control.contact_email.status == "INVALID") {
        this.contact_emailError = true;
        this.formErrors['contact_email'] = 'required or Not a valid Email.';
      }
      else {
        this.contact_emailError = false;
      }
      if(control.state.status == "INVALID") {
        this.stateeError = true;
        this.formErrors['state'] = 'required.';
      }
      else {
        this.stateeError = false;
      }
      if(control.lga.status == "INVALID") {
        this.lgaaError = true;
        this.formErrors['lga'] = 'required.';
      }
    }else {
      this.lgaaError = false;
      this.stateeError = false;
      this.contact_emailError = false;
      this.contactError = false;
      this.tradeError = false;
      this.nationalityError = false;
      this.placeError = false;
      this.birthError = false;
      this.genderError = false;
      this.surnameError = false;
      this.firstnameError = false;
    }
  }


  streetError = false; houseError = false; zipcodeError = false; state_redError = false; lga_redError = false;

  onSubmit2() {
    const feed1 = this.feedbackFormDirective2.invalid
    const control = this.feedbackFormDirective2.form.controls
    if (feed1) {
      if (control.street.status == "INVALID") {
        this.streetError = true;
        this.formErrors['street'] = 'required.';
      }
      else {
        this.streetError = false;
      }
      if(control.house.status == "INVALID") {
        this.houseError = true;
        this.formErrors['house'] = 'required.';
      }
      else {
        this.houseError = false;
      }
      if(control.zipcode.status == "INVALID") {
        this.zipcodeError = true;
        this.formErrors['zipcode'] = 'required.';
      }
      else {
        this.zipcodeError = false;
      }
      if(control.state_red.status == "INVALID") {
        this.state_redError = true;
        this.formErrors['state_red'] = 'required.';
      }
      else {
        this.state_redError = false;
      }
      if(control.lga_red.status == "INVALID") {
        this.lga_redError = true;
        this.formErrors['lga_red'] = 'required.';
      }
      else {
        this.lga_redError = false;
      }
    }else {
      this.streetError = false;
      this.houseError = false;
      this.zipcodeError = false;
      this.state_redError = false;
      this.lga_redError = false;
    }
  }
  onSubmit3() {}

  Submit() {
    this.onSubmit1();
    this.onSubmit2();
    const feed1 = this.feedbackFormDirective1.invalid
    const feed2 = this.feedbackFormDirective2.invalid

    if (feed1 || feed2) {
      this.snackBar.open('Errors in Form fields please check it out.', "", {
        duration: 5000,
        panelClass: "error"
      });
    }  // end of if
    else {
        this.loading2 = true;
        this.disabled2 = true;

        this.feedback1 = this.feedbackForm1.value
        this.feedback2 = this.feedbackForm2.value
        this.feedback3 = this.feedbackForm3.value
        let data: any = {
            payer: {
                address_state: this.feedback2.state_red,
                address_lga: this.feedback2.lga_red
            },
            first_name: this.feedback1.firstname, middle_name: this.feedback1.middlename,
            gender: this.feedback1.gender, dob: this.datepipe.transform(this.feedback1.birth, 'yyyy-MM-dd'),
            pob: this.feedback1.place, state_origin: this.feedback1.state, lga_origin: this.feedback1.lga,
            nationality: this.feedback1.nationality, profession_trade: this.feedback1.trade, 
            employment_category: this.floatLabelControl.value, phone: this.feedback1.contact, surname: this.feedback1.surname,
            email: this.feedback1.contact_email, address: this.feedback2.street, house_no: this.feedback2.house,
            zipcode: this.feedback2.zipcode, employment_status: this.floatLabelControl.value
        }
        Object.assign(data, this.floatLabelControl.value === "employed" ? this.includedFields : {});
        console.log(data)

        this.httpService.AddPayer(data, 'individual').subscribe(
          (data: any) => {
            this.loading2 = false;
            this.disabled2 = false;
            if (data.responsecode === "00") {
              this.store.dispatch(new RemoveIndPayer([{id: 1, data: []}]));
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
            if (err.error?.message == "required") {
              if (err.error.data.email) {
                this.snackBar.open("Email Address already exists in (Section 1)", "", {
                  duration: 5000,
                  panelClass: "error"
                });
              }
              else if (err.error.data.phone) {
                this.snackBar.open("Contact number already exists in (Section 1)", "", {
                  duration: 5000,
                  panelClass: "error"
                });
              }
            }
            else{
              this.snackBar.open(err.error.message || "error", "", {
                duration: 5000,
                panelClass: "error"
              });
            }
          }
        )

    } // end if

  }



// update individual function
  SubmitUpdate() {
    this.onSubmit1();
    this.onSubmit2();
    const feed1 = this.feedbackFormDirective1.invalid
    const feed2 = this.feedbackFormDirective2.invalid

    if (feed1 || feed2) {
      this.snackBar.open('Errors in Form fields please check it out.', "", {
        duration: 5000,
        panelClass: "error"
      });
    }  // end of if
    else {
        this.Updateloading = true;

        this.feedback1 = this.feedbackForm1.value
        this.feedback2 = this.feedbackForm2.value
        this.feedback3 = this.feedbackForm3.value
        let data: any = {
            payer: {
                address_state: this.feedback2.state_red,
                address_lga: this.feedback2.lga_red
            },
            first_name: this.feedback1.firstname, middle_name: this.feedback1.middlename,
            gender: this.feedback1.gender, dob: this.datepipe.transform(this.feedback1.birth, 'yyyy-MM-dd'),
            pob: this.feedback1.place, state_origin: this.feedback1.state, lga_origin: this.feedback1.lga,
            nationality: this.feedback1.nationality, profession_trade: this.feedback1.trade, 
            employment_category: this.floatLabelControl.value, phone: this.feedback1.contact, surname: this.feedback1.surname,
            email: this.feedback1.contact_email, address: this.feedback2.street, house_no: this.feedback2.house,
            zipcode: this.feedback2.zipcode, employment_status: this.floatLabelControl.value
        }
        Object.assign(data, this.floatLabelControl.value === "employed" ? this.includedFields : {});
        console.log(data)

        this.httpService.UpdatePayer('individual', this.editDetails.data.payer.id, data).subscribe(
          (data: any) => {
            console.log(data)
            this.Updateloading = false;
            if (data.responsecode === "00") {
              this.store.dispatch(new RemoveIndPayer([{id: 1, data: []}]));
              this.router.navigate(['/dashboard2/taxpayer'])
              this.snackBar.open('Update successful', "", {
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
            this.Updateloading = false;
            if(err.status === 500){
              this.snackBar.open("Email Address or Contact number Already exists", "", {
                duration: 5000,
                panelClass: "error"
              });
            }
            if (err.error?.message == "required") {
              if (err.error.data.email) {
                this.snackBar.open("Email Address already exists in (Section 1)", "", {
                  duration: 5000,
                  panelClass: "error"
                });
              }
              else if (err.error.data.phone) {
                this.snackBar.open("Contact number already exists in (Section 1)", "", {
                  duration: 5000,
                  panelClass: "error"
                });
              }
            }
            else{
              this.snackBar.open(err.error?.message || "error", "", {
                duration: 5000,
                panelClass: "error"
              });
            }
          }
        )

    } // end if


  }


  trackEmptyFields(): void {
    this.feedbackForm3
      .valueChanges
      .pipe(map(this.filterEmptyFields))
      .subscribe((field: any) => this.includedFields = field); 
  }


  filterEmptyFields(data: any): any {
    let fields: any = {};
    Object.keys(data).forEach(key =>  data[key] != '' ? fields[key] = data[key] : key);
    return fields;
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


  trackCountryField3(): void {
    this.feedbackForm3.get('company_state')
      .valueChanges
      .subscribe((field: string) => {
        if(field === undefined) {
        }else {
          let coun = this.state3.filter((name: any) => name.id===field )
          if (coun[0]?.id) {
            this.lga3 = coun[0]
            this.AddLga3(coun[0].id);
          }
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

  AddLga3(id: number) {
    this.lgaLoading3 = true;
    this.httpService.state('lga', id)
    .subscribe(
      (data: any) => {
        this.options4 = data.data;
        this.filteredBanks6.next(data.data);
        this.lgaLoading3 = false;
      },
      (err: any) => {
        this.lgaLoading3 = false;
        this.lgaError3 = true;
      }
    )
  }


  UpdateValue() {
    if (this.editDetails != undefined) {
      if (this.editDetails.type == 'ind') {
        this.update = true;
        const data = this.editDetails;
        console.log(data)
        this.feedbackForm1.controls['state'].patchValue(data.data.state_origin.id);
        this.feedbackForm2.controls['state_red'].patchValue(data.data.payer.address_state.id);
        this.feedbackForm3.controls['company_state'].patchValue(data.data?.company_state?.id || 0);
        this.feedbackForm1.patchValue({firstname: data.data.first_name});
        this.feedbackForm1.patchValue({surname: data.data.surname});
        this.feedbackForm1.patchValue({middlename: data.data.middle_name || ""});
        this.feedbackForm1.patchValue({gender: data.data.gender});
        this.feedbackForm1.patchValue({birth: data.data.dob});
        this.feedbackForm1.patchValue({place: data.data.pob});
        this.feedbackForm1.controls['lga'].patchValue(data.data.lga_origin.id);
        this.feedbackForm1.patchValue({nationality: data.data.nationality});
        this.feedbackForm1.patchValue({trade: data.data.profession_trade});
        this.feedbackForm1.patchValue({contact: data.data.phone});
        this.feedbackForm1.patchValue({contact_email: data.data.email});
        this.feedbackForm2.patchValue({street: data.data.address});
        this.feedbackForm2.patchValue({house: data.data.house_no});
        this.feedbackForm2.patchValue({zipcode: data.data.zipcode});
        this.feedbackForm2.controls['lga_red'].patchValue(data.data.payer.address_lga.id);
        this.feedbackForm3.patchValue({company_name: data.data.company_name || ""});
        this.feedbackForm3.patchValue({company_house_no: data.data.company_house_no || ""});
        this.feedbackForm3.patchValue({company_estate_street: data.data.company_estate_street || ""});
        this.feedbackForm3.patchValue({company_zipcode: data.data.company_zipcode || ""});
        this.feedbackForm3.patchValue({company_country: data.data.company_country || ""});
        this.feedbackForm3.controls['company_lga'].patchValue(data.data?.company_lga?.id || "");
        this.floatLabelControl = new FormControl(data.data.employment_status);
      }
    }else {}
  }

  /////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void {

    this.authService.checkExpired();

    this.AddState();
    this.UpdateValue();

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


        // third layer
        // 5
      this.bankCtrl5.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching5 = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(searchC => {
          const filterValue = searchC.toLowerCase();
          if (!this.option3) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.option.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.option3.filter((bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1);
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(filteredBanks => {
        this.searching5 = false;
        this.filteredBanks5.next(filteredBanks);
      },
        error => {
          // no errors in our simulated example
          this.searching5 = false;
          // handle error...
        });


      // 6
      this.bankCtrl6.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching6 = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(searchC => {
          const filterValue = searchC.toLowerCase();
          if (!this.options4) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.options2.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.options4.filter((bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1);
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(filteredBanks4 => {
        this.searching6 = false;
        this.filteredBanks6.next(filteredBanks4);
      },
        error => {
          // no errors in our simulated example
          this.searching6 = false;
          // handle error...
        });
        
  }



}
