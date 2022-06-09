import { DatePipe, Location } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  debounceTime,
  delay,
  filter,
  map,
  Observable,
  ReplaySubject,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import {
  AppState,
  selectAllIndPayer,
  selectAllProfile,
  selectAllStates,
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import {
  AddIndPayer,
  AddStates,
  RemoveIndPayer,
} from '../../../actions/irm.action';
import { IndPayer, Profile, States } from '../../models/irm';
import { DialogComponent } from '../../dialog/dialog.component';
import {
  Individual1,
  Individual2,
  LGA,
  lgaLogo,
  NIN,
  STATE,
  stateLogo,
} from '../../shared/form';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-individual2',
  templateUrl: './individual2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./individual2.component.scss'],
})
export class Individual2Component implements OnDestroy, OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  @ViewChild('fform1') feedbackFormDirective1: any;
  @ViewChild('fform2') feedbackFormDirective2: any;

  feedbackForm1: any = FormGroup;
  feedbackForm2: any = FormGroup;
  feedback!: NIN;
  loading = false;
  disabled = false;
  payer_data: any;

  floatLabelControl = new FormControl('employed');
  feedback1!: Individual1;
  feedback2!: Individual2;
  includedFields: any;

  loading2 = false;
  disabled2 = false;
  isFormDisabled = false;

  bankCtrl: FormControl = new FormControl();
  bankCtrl2: FormControl = new FormControl();
  bankCtrl3: FormControl = new FormControl();
  bankCtrl4: FormControl = new FormControl();
  filteredBanks: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(1);
  filteredBanks2: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);
  filteredBanks3: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(
    1
  );
  filteredBanks4: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);
  option = STATE;
  options2 = LGA;
  option2 = STATE;
  options3 = LGA;
  searching = false;
  searching2 = false;
  searching3 = false;
  searching4 = false;
  searchError!: string;
  searchError2!: string;
  protected _onDestroy = new Subject<void>();
  stateError: boolean = false;
  stateError2: boolean = false;
  stateLoading = false;
  stateLoading2 = false;
  lgaError: boolean = false;
  lgaError2: boolean = false;
  lgaLoading = false;
  lgaLoading2 = false;
  update = false;
  Updateloading = false;
  state: any;
  state2: any;
  lga: any;
  lga2: any;

  editDetails: any;

  stateStates: Observable<States[]>;
  stateProfile: Observable<Profile[]>;
  stateInd: Observable<IndPayer[]>;

  formErrors: any = {
    firstname: '',
    middlename: '',
    surname: '',
    gender: '',
    birth: '',
    place: '',
    state: '',
    lga: '',
    nationality: '',
    trade: '',
    contact: '',
    contact_email: '',
    house: '',
    street: '',
    state_red: '',
    lga_red: '',
    zipcode: '',
    // 'employment': '',
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
    gender: {
      required: 'required.',
    },
    birth: {
      required: 'required.',
    },
    place: {
      required: 'required.',
    },
    state: {
      required: 'required.',
    },
    lga: {
      required: 'required.',
    },
    nationality: {
      required: 'required.',
    },
    trade: {
      required: 'required.',
    },
    // 'employment': {
    //   'required':      'required.',
    // },
    contact: {
      required: 'required.',
    },
    contact_email: {
      required: 'required.',
      email: 'Not a valid email',
    },
    house: {
      required: 'required.',
    },
    street: {
      required: 'required.',
    },
    state_red: {
      required: 'required.',
    },
    lga_red: {
      required: 'required.',
    },
    zipcode: {
      required: 'required.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    public datepipe: DatePipe,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
    public shared: ToggleNavService,
    private dialog: MatDialog
  ) {
    this.authService.checkExpired();
    this.createForm1();
    this.createForm2();
    this.trackCountryField();
    this.trackCountryField2();

    this.stateStates = store.select(selectAllStates);
    this.stateProfile = store.select(selectAllProfile);
    this.stateInd = store.select(selectAllIndPayer);
    this.editDetails = this.shared.getPayerEditMessage();
    const data = this.shared.getPayerMessage();
    this.payer_data = data;
    if (
      (data == '' || data == undefined || data == null) &&
      (this.editDetails == undefined || this.editDetails == '')
    ) {
      this.router.navigate(['/dashboard/dashboard22/taxpayer']);
    } else {
      this.payer_data = data;
    }
  }

  createForm1() {
    this.feedbackForm1 = this.fb.group({
      title: [''],
      firstname: ['', [Validators.required]],
      middlename: [''],
      surname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      place: ['', [Validators.required]],
      state: ['', [Validators.required]],
      lga: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      trade: ['', [Validators.required]],
      // employment: ['', [Validators.required] ],
      contact: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
    });

    this.feedbackForm1.valueChanges.subscribe((data: any) =>
      this.onValueChanged1(data)
    );
    this.onValueChanged1(); // (re)set validation messages now
  }

  createForm2() {
    this.feedbackForm2 = this.fb.group({
      house: ['', [Validators.required]],
      street: ['', [Validators.required]],
      state_red: ['', [Validators.required]],
      lga_red: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
    });

    this.feedbackForm2.valueChanges.subscribe((data: any) =>
      this.onValueChanged2(data)
    );
    this.onValueChanged2(); // (re)set validation messages now
  }

  onValueChanged1(data?: any) {
    if (!this.feedbackForm1) {
      return;
    }
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
    if (!this.feedbackForm2) {
      return;
    }
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
  }

  firstnameError: any;
  surnameError: any;
  genderError: any;
  birthError: any;
  placeError: any;
  nationalityError: any;
  tradeError: any;
  contactError: any;
  contact_emailError: any;
  stateeError: any;
  lgaaError: any;

  onSubmit1() {
    const feed1 = this.feedbackFormDirective1.invalid;
    const control = this.feedbackFormDirective1.form.controls;
    if (feed1) {
      if (control.firstname.status == 'INVALID') {
        this.firstnameError = 'required.';
        this.formErrors['firstname'] = 'required.';
      } else {
        this.firstnameError = '';
      }
      if (control.surname.status == 'INVALID') {
        this.surnameError = 'required.';
        this.formErrors['surname'] = 'required.';
      } else {
        this.surnameError = '';
      }
      if (control.gender.status == 'INVALID') {
        this.genderError = 'required.';
        this.formErrors['gender'] = 'required.';
      } else {
        this.genderError = '';
      }
      if (control.birth.status == 'INVALID') {
        this.birthError = 'required.';
        this.formErrors['birth'] = 'required.';
      } else {
        this.birthError = '';
      }
      if (control.place.status == 'INVALID') {
        this.placeError = 'required.';
        this.formErrors['place'] = 'required.';
      } else {
        this.placeError = '';
      }
      if (control.nationality.status == 'INVALID') {
        this.nationalityError = 'required.';
        this.formErrors['nationality'] = 'required.';
      } else {
        this.nationalityError = '';
      }
      if (control.trade.status == 'INVALID') {
        this.tradeError = 'required.';
        this.formErrors['trade'] = 'required.';
      } else {
        this.tradeError = '';
      }
      if (control.contact.status == 'INVALID') {
        this.contactError = 'required.';
        this.formErrors['contact'] = 'required.';
      } else {
        this.contactError = '';
      }
      if (control.contact_email.status == 'INVALID') {
        this.contact_emailError = control.contact_email.errors.email
          ? 'not a valid email.'
          : 'required.';
        this.formErrors['contact_email'] = control.contact_email.errors.email
          ? 'not a valid email.'
          : 'required.';
      } else {
        this.contact_emailError = '';
      }
      if (control.state.status == 'INVALID') {
        this.stateeError = 'required.';
        this.formErrors['state'] = 'required.';
      } else {
        this.stateeError = '';
      }
      if (control.lga.status == 'INVALID') {
        this.lgaaError = 'required.';
        this.formErrors['lga'] = 'required.';
      } else {
        this.lgaaError = '';
      }
    } else {
      this.lgaaError = '';
      this.stateeError = '';
      this.contact_emailError = '';
      this.contactError = '';
      this.tradeError = '';
      this.nationalityError = '';
      this.placeError = '';
      this.birthError = '';
      this.genderError = '';
      this.surnameError = '';
      this.firstnameError = '';
    }
  }

  streetError: any;
  houseError: any;
  zipcodeError: any;
  state_redError: any;
  lga_redError: any;

  onSubmit2() {
    const feed1 = this.feedbackFormDirective2.invalid;
    const control = this.feedbackFormDirective2.form.controls;
    if (feed1) {
      if (control.street.status == 'INVALID') {
        this.streetError = 'required.';
        this.formErrors['street'] = 'required.';
      } else {
        this.streetError = '';
      }
      if (control.house.status == 'INVALID') {
        this.houseError = 'required.';
        this.formErrors['house'] = 'required.';
      } else {
        this.houseError = '';
      }
      if (control.zipcode.status == 'INVALID') {
        this.zipcodeError = 'required.';
        this.formErrors['zipcode'] = 'required.';
      } else {
        this.zipcodeError = '';
      }
      if (control.state_red.status == 'INVALID') {
        this.state_redError = 'required.';
        this.formErrors['state_red'] = 'required.';
      } else {
        this.state_redError = '';
      }
      if (control.lga_red.status == 'INVALID') {
        this.lga_redError = 'required.';
        this.formErrors['lga_red'] = 'required.';
      } else {
        this.lga_redError = '';
      }
    } else {
      this.streetError = '';
      this.houseError = '';
      this.zipcodeError = '';
      this.state_redError = '';
      this.lga_redError = '';
    }
  }
  onSubmit3() {}

  Submit() {
    this.onSubmit1();
    this.onSubmit2();
    const feed1 = this.feedbackFormDirective1.invalid;
    const feed2 = this.feedbackFormDirective2.invalid;

    if (feed1 || feed2) {
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

      this.feedback1 = this.feedbackForm1.value;
      this.feedback2 = this.feedbackForm2.value;
      console.log(this.feedbackForm1.value);
      let data: any = {
        first_name: this.feedback1.firstname,
        middle_name: this.feedback1.middlename,
        gender: this.feedback1.gender,
        dob: this.datepipe.transform(this.feedback1.birth, 'yyyy-MM-dd'),
        pob: this.feedback1.place,
        state_origin: this.feedback1.state.split('|||')[1],
        lga: this.feedback1.lga.split('|||')[1],
        nationality: this.feedback1.nationality,
        profession_trade: this.feedback1.trade,
        employment_category: this.floatLabelControl.value,
        phone: this.feedback1.contact,
        surname: this.feedback1.surname,
        email: this.feedback1.contact_email,
        address: this.feedback2.street,
        house_no: this.feedback2.house,
        zipcode: this.feedback2.zipcode,
        employment_status: this.floatLabelControl.value,
        state_id: this.feedback2.state_red,
        lga_id: this.feedback2.lga_red,
      };
      // Object.assign(
      //   data,
      //   this.floatLabelControl.value == 'employed' ? this.includedFields : {}
      // );
      this.httpService.AddPayer(data, 'individual').subscribe(
        (data: any) => {
          this.loading2 = false;
          this.disabled2 = false;
          this.RemoveFormData();
          this.shared.setPayerMessage('');
          let datas2: any = [];
          this.stateInd.forEach((e) => {
            if (e.length > 0) {
              let datas = Object.assign([], e[0].data);
              datas.unshift(data.data);
              datas2 = datas;
            }
          });
          this.store.dispatch(new RemoveIndPayer([{ id: 1, data: [] }]));
          this.store.dispatch(new AddIndPayer([{ id: 1, data: datas2 }]));
          this.router.navigate(['/dashboard/dashboard2/taxpayer']);
          this.OpenDialog(data.data);
          // this.snackBar.open('Registration successful', '', {
          //   duration: 3000,
          //   panelClass: 'success',
          //   horizontalPosition: 'center',
          //   verticalPosition: 'top',
          // });
        },
        (err: any) => {
          console.log(err);
          this.authService.checkExpired();
          this.loading2 = false;
          this.disabled2 = false;
          this.snackBar.open(
            err?.error?.msg || err?.error?.detail || 'An Error Occured!',
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
    } // end if
  }

  // update individual function
  SubmitUpdate() {
    this.onSubmit1();
    this.onSubmit2();
    const feed1 = this.feedbackFormDirective1.invalid;
    const feed2 = this.feedbackFormDirective2.invalid;

    if (feed1 || feed2) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.Updateloading = true;

      this.feedback1 = this.feedbackForm1.value;
      this.feedback2 = this.feedbackForm2.value;
      let data: any = {
        first_name: this.editDetails.data.first_name,
        middle_name: this.editDetails.data.middle_name,
        gender: this.editDetails.data.gender,
        dob: this.editDetails.data.dob,
        pob: this.editDetails.data.pob,
        state_origin: this.editDetails.data.state_origin,
        lga: this.editDetails.data.lga,
        nationality: this.editDetails.data.nationality,
        state_id: this.feedback2.state_red || this.editDetails.data.state_id,
        lga_id: this.feedback2.lga_red || this.editDetails.data.lga_id,
        profession_trade:
          this.feedback1.trade || this.editDetails.data.profession_trade,
        employment_category:
          this.floatLabelControl.value ||
          this.editDetails.data.employment_category,
        phone: this.feedback1.contact || this.editDetails.data.phone,
        surname: this.feedback1.surname || this.editDetails.data.surname,
        email: this.feedback1.contact_email || this.editDetails.data.phone,
        address: this.feedback2.street || this.editDetails.data.address,
        house_no: this.feedback2.house || this.editDetails.data.house_no,
        zipcode: this.feedback2.zipcode || this.editDetails.data.zipcode,
        employment_status:
          this.floatLabelControl.value ||
          this.editDetails.data.employment_status,
      };
      // let previous_data = this.editDetails;
      // if (
      //   data.email == null ||
      //   data.email == undefined ||
      //   previous_data.data.email == this.feedback1.contact_email
      // ) {
      //   delete data.email;
      // }
      // if (
      //   data.phone == null ||
      //   data.phone == undefined ||
      //   previous_data.data.phone == this.feedback1.contact
      // ) {
      //   delete data.phone;
      // }
      console.log(data);
      this.httpService.UpdatePayer(this.editDetails.data.id, data).subscribe(
        (data: any) => {
          console.log(data);
          this.Updateloading = false;
          this.shared.setPayerEditMessage(undefined);
          this.shared.setPayerMessage('');
          let datas: any = [];
          let indexx: any;
          // update state
          this.stateInd.forEach((e) => {
            if (e.length > 0) {
              let x = JSON.parse(JSON.stringify(e[0].data));
              x.filter((dat: any, index: any) => {
                if (dat.id == this.editDetails.data.id) {
                  indexx = index;
                }
              });
              datas.push(x);
            }
          });
          datas[0][indexx] = data.data;
          this.store.dispatch(new RemoveIndPayer([{ id: 1, data: [] }]));
          this.store.dispatch(new AddIndPayer([{ id: 1, data: datas[0] }]));
          this.router.navigate(['/dashboard/dashboard2/taxpayer/ind']);
          this.dialog.closeAll();
          this.OpenDialog(data.data);
        },
        (err: any) => {
          console.log(err);
          this.authService.checkExpired();
          this.Updateloading = false;
          this.snackBar.open(
            err?.error?.message || err?.error?.detail || 'An Error Occured',
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
    } // end if
  }

  filterEmptyFields(data: any): any {
    let fields: any = {};
    Object.keys(data).forEach((key) =>
      data[key] != '' ? (fields[key] = data[key]) : key
    );
    return fields;
  }

  back() {
    this.shared.setPayerEditMessage(undefined);
    this._location.back();
  }

  trackCountryField(): void {
    this.feedbackForm1.get('state').valueChanges.subscribe((field: string) => {
      if (field === undefined) {
      } else {
        const splitt = field.split('|||');
        let coun = this.state.filter(
          (name: any) => name.id == Number(splitt[0]) || name.name == splitt
        );
        this.lga = coun[0];
        this.AddLga(coun[0].id || coun[0]);
      }
    });
  }

  trackCountryField2(): void {
    this.feedbackForm2
      .get('state_red')
      .valueChanges.subscribe((field: string) => {
        if (field === undefined) {
        } else {
          let coun = this.state2.filter((name: any) => name.id === field);
          this.lga2 = coun[0];
          this.AddLga2(coun[0].id);
        }
      });
  }

  AddState() {
    this.stateLoading = true;
    this.stateLoading2 = true;
    this.stateStates.forEach((e) => {
      if (e.length > 0) {
        this.option = e[0].data;
        this.state = e[0].data;
        this.state2 = e[0].data;
        this.filteredBanks.next(e[0].data);
        this.filteredBanks3.next(e[0].data);
        this.stateLoading = false;
        this.stateLoading2 = false;
      } else {
        this.httpService.state().subscribe(
          (data: any) => {
            this.option = data;
            this.state = data;
            this.state2 = data;
            this.filteredBanks.next(data);
            this.filteredBanks3.next(data);
            this.stateLoading = false;
            this.stateLoading2 = false;
            this.store.dispatch(new AddStates([{ id: 1, data: data }]));
          },
          (err) => {
            this.stateLoading = false;
            this.stateLoading2 = false;
            this.stateError = true;
          }
        );
      }
    });
    // end of state
  }

  AddLga(id: any) {
    this.lgaLoading = true;
    this.httpService.lga(id).subscribe(
      (data: any) => {
        this.options2 = data.data;
        this.filteredBanks2.next(data.data);
        this.lgaLoading = false;
      },
      (err: any) => {
        this.lgaLoading = false;
        this.lgaError = true;
      }
    );
  }

  AddLga2(id: number) {
    this.lgaLoading2 = true;
    this.httpService.lga(id).subscribe(
      (data: any) => {
        this.options3 = data.data;
        this.filteredBanks4.next(data.data);
        this.lgaLoading2 = false;
      },
      (err: any) => {
        this.lgaLoading2 = false;
        this.lgaError2 = true;
      }
    );
  }

  disableForm() {
    this.feedbackForm1.controls['state'].disable();
    this.feedbackForm1.controls['firstname'].disable();
    this.feedbackForm1.controls['surname'].disable();
    this.feedbackForm1.controls['middlename'].disable();
    this.feedbackForm1.controls['gender'].disable();
    this.feedbackForm1.controls['birth'].disable();
    this.feedbackForm1.controls['place'].disable();
    this.feedbackForm1.controls['lga'].disable();
    this.feedbackForm1.controls['nationality'].disable();
  }

  UpdateValue() {
    if (this.editDetails != undefined) {
      if (this.editDetails.type == 'ind') {
        this.update = true;
        const data = this.editDetails;
        this.feedbackForm1.controls['state'].patchValue(
          data.data.state_origin
        );
        this.feedbackForm2.controls['state_red'].patchValue(
          data.data.state_id.id
        );
        this.feedbackForm1.patchValue({ firstname: data.data.first_name });
        this.feedbackForm1.patchValue({ surname: data.data.surname });
        this.feedbackForm1.patchValue({
          middlename: data.data.middle_name || '',
        });
        this.feedbackForm1.patchValue({ gender: data.data.gender });
        this.feedbackForm1.patchValue({ birth: data.data.dob });
        this.feedbackForm1.patchValue({ place: data.data.pob });
        this.feedbackForm1.patchValue({ nationality: data.data.nationality });
        this.feedbackForm1.patchValue({ trade: data.data.profession_trade });
        this.feedbackForm1.patchValue({ contact: data.data.phone });
        this.feedbackForm1.patchValue({ contact_email: data.data.email });
        this.feedbackForm2.patchValue({ street: data.data.address });
        this.feedbackForm2.patchValue({ house: data.data.house_no });
        this.feedbackForm2.patchValue({ zipcode: data.data.zipcode });
        this.feedbackForm2.controls['lga_red'].patchValue(data.data.lga_id.id);
        this.feedbackForm1.controls['lga'].patchValue(data.data.lga);
        this.floatLabelControl = new FormControl(data.data.employment_status);
      }
    } else {
    }
    if (this.editDetails == undefined || this.editDetails == '') {
    } else {
      this.disableForm();
    }
  }

  OpenDialog(data: any) {
    this.dialog.open(DialogComponent, {
      data: {
        type: 'ind',
        data: data,
      },
    });
  }

  changePayerData() {
    const data = {
      type: 'change',
      payer_type: 'individual',
      nin: this.payer_data?.nin,
      birth: this.payer_data?.birth,
      data: this.payer_data,
    };
    this.shared.setPayerMessage(data);
    this.router.navigate(['/dashboard/dashboard22/taxpayer']);
  }

  /////////////////////////////////////////////////////////////////////////////////

  initAnimations(): void {
    gsap.from(this.card.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      y: 40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.initAnimations();
    this.AddState();
    this.UpdateValue();

    this.bankCtrl.valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.searching = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((searchC) => {
          const filterValue = searchC.toLowerCase();
          if (!this.option) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.option.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.option.filter(
            (bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1
          );
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (filteredBanks) => {
          this.searching = false;
          this.filteredBanks.next(filteredBanks);
        },
        (error) => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        }
      );

    // 2
    this.bankCtrl2.valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.searching2 = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((searchC) => {
          const filterValue = searchC.toLowerCase();
          if (!this.options2) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.options2.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.options2.filter(
            (bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1
          );
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (filteredBanks) => {
          this.searching2 = false;
          this.filteredBanks2.next(filteredBanks);
        },
        (error) => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        }
      );

    // second layer

    this.bankCtrl3.valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.searching3 = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((searchC) => {
          const filterValue = searchC.toLowerCase();
          if (!this.option2) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.option.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.option2.filter(
            (bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1
          );
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (filteredBanks) => {
          this.searching3 = false;
          this.filteredBanks3.next(filteredBanks);
        },
        (error) => {
          // no errors in our simulated example
          this.searching3 = false;
          // handle error...
        }
      );

    // 4
    this.bankCtrl4.valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.searching4 = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((searchC) => {
          const filterValue = searchC.toLowerCase();
          if (!this.options3) {
            return [];
          }
          // simulate server fetching and filtering data
          // return this.options2.filter((bank: any) => bank.name.toLowerCase().includes(filterValue));
          return this.options3.filter(
            (bank: any) => bank.name.toLowerCase().indexOf(filterValue) > -1
          );
        }),
        delay(100),
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (filteredBanks4) => {
          this.searching4 = false;
          this.filteredBanks4.next(filteredBanks4);
        },
        (error) => {
          // no errors in our simulated example
          this.searching4 = false;
          // handle error...
        }
      );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.shared.setPayerEditMessage(undefined);
  }
}
