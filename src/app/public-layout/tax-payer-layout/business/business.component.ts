import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  ReplaySubject,
  Subject,
  filter,
  tap,
  takeUntil,
  debounceTime,
  map,
  delay,
} from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Location, DatePipe } from '@angular/common';
import {
  Business,
  Individual2,
  LGA,
  lgaLogo,
  STATE,
  stateLogo,
} from '../../shared/form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
// state management
import { Store } from '@ngrx/store';
import { States, Profile } from '../../../models/irm';
import {
  AppState,
  selectAllStates,
  selectAllProfile,
} from 'src/app/reducers/index';
import { AddStates, RemoveComPayer } from '../../../actions/irm.action';
import { Observable } from 'rxjs';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { Router } from '@angular/router';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnDestroy, OnInit {
  
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  @ViewChild('fform2') feedbackFormDirective2: any;
  @ViewChild('fform3') feedbackFormDirective3: any;

  feedbackForm2: any = FormGroup;
  feedbackForm3: any = FormGroup;
  loading = false;
  disabled = false;

  feedback2!: Individual2;
  feedback3!: Business;

  loading2 = false;
  disabled2 = false;
  update = false;
  Updateloading = false;

  bankCtrl3: FormControl = new FormControl();
  bankCtrl4: FormControl = new FormControl();
  filteredBanks3: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(
    1
  );
  filteredBanks4: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);

  option2 = STATE;
  options3 = LGA;
  searching3 = false;
  searching4 = false;
  protected _onDestroy = new Subject<void>();
  stateLoading2 = false;
  stateError2: boolean = false;
  lgaError2: boolean = false;
  lgaLoading2 = false;
  state2: any;
  lga2: any;

  editDetails: any;

  stateStates: Observable<States[]>;
  stateProfile: Observable<Profile[]>;

  formErrors: any = {
    contact: '',
    contact_email: '',
    house: '',
    street: '',
    state_red: '',
    lga_red: '',
    zipcode: '',
    org_name: '',
    nature_bus: '',
    num_emp: '',
    date_est: '',
    contact_num: '',
    email: '',
  };

  validationMessages: any = {
    contact: {
      required: 'required.',
    },
    contact_email: {
      required: 'required.',
      email: 'Not a valid email.',
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
    org_name: {
      required: 'required.',
    },
    nature_bus: {
      required: 'required.',
    },
    num_emp: {
      required: 'required.',
    },
    date_est: {
      required: 'required.',
    },
    contact_num: {
      required: 'required.',
    },
    email: {
      required: 'required.',
      email: 'Not a valid email.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    public datepipe: DatePipe,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    public shared: ToggleNavService,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authService.checkExpired();
    this.createForm2();
    this.createForm3();
    this.trackCountryField2();
    this.stateStates = store.select(selectAllStates);
    this.stateProfile = store.select(selectAllProfile);

    this.editDetails = this.shared.getPayerEditMessage();
  }

  createForm2() {
    this.feedbackForm2 = this.fb.group({
      house: ['', [Validators.required]],
      street: ['', [Validators.required]],
      state_red: ['', [Validators.required]],
      lga_red: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
    });

    this.feedbackForm2.valueChanges.subscribe((data: any) =>
      this.onValueChanged2(data)
    );
    this.onValueChanged2(); // (re)set validation messages now
  }

  createForm3() {
    this.feedbackForm3 = this.fb.group({
      org_name: ['', [Validators.required]],
      nature_bus: ['', [Validators.required]],
      num_emp: ['', [Validators.required]],
      date_est: ['', [Validators.required]],
      contact_num: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      alt_num: [''],
      website: [''],
    });

    this.feedbackForm3.valueChanges.subscribe((data: any) =>
      this.onValueChanged3(data)
    );
    this.onValueChanged3(); // (re)set validation messages now
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
  }

  streetError: any;
  houseError: any;
  zipcodeError: any;
  state_redError: any;
  lga_redError: any;
  contactError: any;
  contact_emailError: any;

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
      this.contact_emailError = '';
      this.contactError = '';
    }
  }

  org_nameError: any;
  nature_busError: any;
  num_empError: any;
  date_estError: any;
  contact_numError: any;
  emailError: any;

  onSubmit3() {
    const feed1 = this.feedbackFormDirective3.invalid;
    const control = this.feedbackFormDirective3.form.controls;
    console.log(control);
    if (feed1) {
      if (control.org_name.status == 'INVALID') {
        this.org_nameError = 'required.';
        this.formErrors['org_name'] = 'required.';
      } else {
        this.org_nameError = '';
      }
      if (control.nature_bus.status == 'INVALID') {
        this.nature_busError = 'required.';
        this.formErrors['nature_bus'] = 'required.';
      } else {
        this.nature_busError = '';
      }
      if (control.num_emp.status == 'INVALID') {
        this.num_empError = 'required.';
        this.formErrors['num_emp'] = 'required.';
      } else {
        this.num_empError = '';
      }
      if (control.date_est.status == 'INVALID') {
        this.date_estError = 'required.';
        this.formErrors['date_est'] = 'required.';
      } else {
        this.date_estError = '';
      }
      if (control.contact_num.status == 'INVALID') {
        this.contact_numError = 'required.';
        this.formErrors['contact_num'] = 'required.';
      } else {
        this.contact_numError = '';
      }
      if (control.email.status == 'INVALID') {
        this.emailError = control.email.errors.email
        ? 'not a valid email.'
        : 'required.';
        this.formErrors['email'] = control.email.errors.email
        ? 'not a valid email.'
        : 'required.';
      } else {
        this.emailError = '';
      }
    } else {
      this.emailError = '';
      this.contact_numError = '';
      this.date_estError = '';
      this.num_empError = '';
      this.nature_busError = '';
      this.org_nameError = '';
    }
  }

  Submit() {
    this.onSubmit2();
    this.onSubmit3();
    const feed2 = this.feedbackFormDirective2.invalid;
    const feed3 = this.feedbackFormDirective3.invalid;

    if (feed2 || feed3) {
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

      this.feedback2 = this.feedbackForm2.value;
      this.feedback3 = this.feedbackForm3.value;
      let data = {
        payer: {
          address_state: this.feedback2.state_red,
          address_lga: this.feedback2.lga_red,
        },
        organisation_name: this.feedback3.org_name,
        business_nature: this.feedback3.nature_bus,
        number_employee: this.feedback3.num_emp,
        establishment_date: this.datepipe.transform(
          this.feedback3.date_est,
          'yyyy-MM-dd'
        ),
        office_website_url: this.feedback3.website || '',
        org_phone: this.feedback3.contact_num,
        org_email: this.feedback3.email,
        alt_phone: this.feedback3.alt_num || '',
        address: this.feedback2.street,
        house_no: this.feedback2.house,
        zipcode: this.feedback2.zipcode,
      };
      console.log(data);

      this.httpService.AddPayer(data, 'company').subscribe(
        (data: any) => {
          this.loading2 = false;
          this.disabled2 = false;
          if (data.responsecode === '00') {
            this.store.dispatch(new RemoveComPayer([{ id: 1, data: [] }]));
            this.snackBar.open('Registration successful', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.RemoveFormData();
          } else {
            this.snackBar.open(data.message || 'error', '', {
              duration: 3000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        },
        (err: any) => {
          console.log(err);
          this.loading2 = false;
          this.disabled2 = false;
          if (err.error?.message == 'required') {
            if (err.error?.data.org_email) {
              this.snackBar.open(
                'Email Address already exists in (Section 1)',
                '',
                {
                  duration: 5000,
                  panelClass: 'error',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                }
              );
            } else if (err.error.data.org_phone) {
              this.snackBar.open(
                'Contact number already exists in (Section 1)',
                '',
                {
                  duration: 5000,
                  panelClass: 'error',
                }
              );
            } else if (err.error.data.office_website_url) {
              this.snackBar.open(
                'Invalid Office Website URL in (Section 1)',
                '',
                {
                  duration: 5000,
                  panelClass: 'error',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                }
              );
            }
          } else {
            this.snackBar.open(err.error?.message || 'error', '', {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        }
      );
    } // end else
  }

  back() {
    this.shared.setPayerEditMessage(undefined);
    this._location.back();
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
    this.stateLoading2 = true;
    this.stateStates.forEach((e) => {
      if (e.length > 0) {
        this.state2 = e[0].data;
        this.option2 = e[0].data;
        this.filteredBanks3.next(e[0].data);
        this.stateLoading2 = false;
      } else {
        this.httpService.state().subscribe(
          (data: any) => {
            this.option2 = data;
            this.filteredBanks3.next(data);
            this.state2 = data;
            this.store.dispatch(new AddStates([{ id: 1, data: data }]));
            this.stateLoading2 = false;
          },
          (err) => {
            this.stateLoading2 = false;
          }
        );
      }
    });
    // end of state
  }

  AddLga2(id: number) {
    this.lgaLoading2 = true;
    this.httpService.lga(id).subscribe(
      (data: any) => {
        this.filteredBanks4.next(data.lga);
        this.lgaLoading2 = false;
      },
      (err: any) => {
        this.lgaLoading2 = false;
        this.lgaError2 = true;
      }
    );
  }

  UpdateValue() {
    if (this.editDetails != undefined) {
      if (this.editDetails.type == 'com') {
        this.update = true;
        const data = this.editDetails;
        console.log(data);
        this.feedbackForm2.controls['state_red'].patchValue(
          data.data.payer.address_state.id
        );
        this.feedbackForm2.patchValue({ street: data.data.address });
        this.feedbackForm2.patchValue({ house: data.data.house_no });
        this.feedbackForm2.patchValue({ zipcode: data.data.zipcode });
        this.feedbackForm2.controls['lga_red'].patchValue(
          data.data.payer.address_lga.id
        );
        this.feedbackForm2.patchValue({ zipcode: data.data.zipcode });
        this.feedbackForm3.patchValue({
          org_name: data.data.organisation_name,
        });
        this.feedbackForm3.patchValue({
          nature_bus: data.data.business_nature,
        });
        this.feedbackForm3.patchValue({ num_emp: data.data.number_employee });
        this.feedbackForm3.patchValue({
          date_est: data.data.establishment_date,
        });
        this.feedbackForm3.patchValue({
          website: data.data.office_website_url || '',
        });
        this.feedbackForm3.patchValue({ contact_num: data.data.org_phone });
        this.feedbackForm3.patchValue({ email: data.data.org_email });
        this.feedbackForm3.patchValue({ alt_num: data.data.alt_phone || '' });
      }
    } else {
    }
  }

  SubmitUpdate() {
    this.onSubmit2();
    this.onSubmit3();
    const feed2 = this.feedbackFormDirective2.invalid;
    const feed3 = this.feedbackFormDirective3.invalid;

    if (feed2 || feed3) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.Updateloading = true;
      this.feedback2 = this.feedbackForm2.value;
      this.feedback3 = this.feedbackForm3.value;
      let data = {
        payer: {
          address_state: this.feedback2.state_red,
          address_lga: this.feedback2.lga_red,
        },
        organisation_name: this.feedback3.org_name,
        business_nature: this.feedback3.nature_bus,
        number_employee: this.feedback3.num_emp,
        establishment_date: this.datepipe.transform(
          this.feedback3.date_est,
          'yyyy-MM-dd'
        ),
        office_website_url: this.feedback3.website || '',
        org_phone: this.feedback3.contact_num,
        org_email: this.feedback3.email,
        alt_phone: this.feedback3.alt_num || '',
        address: this.feedback2.street,
        house_no: this.feedback2.house,
        zipcode: this.feedback2.zipcode,
      };
      console.log(data);

      this.httpService
        .UpdatePayer('company', this.editDetails.data.payer.id, data)
        .subscribe(
          (data: any) => {
            this.Updateloading = false;
            if (data.responsecode === '00') {
              this.store.dispatch(new RemoveComPayer([{ id: 1, data: [] }]));
              this.shared.setPayerEditMessage(undefined);
              this.router.navigate(['/dashboard2/taxpayer/non']);
              this.snackBar.open('successfully updated Details', '', {
                duration: 3000,
                panelClass: 'success',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.RemoveFormData();
            } else {
              this.snackBar.open(data.message || 'error', '', {
                duration: 5000,
                panelClass: 'error',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          },
          (err: any) => {
            console.log(err);
            this.Updateloading = false;
            if (err.status === 500) {
              this.snackBar.open(
                'Email Address or Contact number Already exists in (Section 1)',
                '',
                {
                  duration: 5000,
                  panelClass: 'error',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                }
              );
            } else {
              this.snackBar.open(err.error?.message || 'error', '', {
                duration: 5000,
                panelClass: 'error',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          }
        );
    } // end else
  }

  ngOnInit(): void {
    this.authService.checkExpired();

    this.AddState();
    this.UpdateValue();

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
