import { DatePipe, Location } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
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
  tap
} from 'rxjs';
import {
  AppState,
  selectAllIndPayer,
  selectAllProfile,
  selectAllStates
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import {
  AddIndPayer,
  AddStates,
  RemoveIndPayer
} from '../../../actions/irm.action';
import { DialogComponent } from '../../dialog/dialog.component';
import { IndPayer, Profile, States } from '../../models/irm';
import {
  Individual1, LGA,
  lgaLogo, STATE,
  stateLogo
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

  feedbackForm1: any = FormGroup;
  loading = false;
  disabled = false;
  payer_data: any;

  floatLabelControl = new FormControl('employed');
  feedback1!: Individual1;
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
      matDatepickerParse: 'not a valid date',
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
      contact: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
      //
      house: ['', [Validators.required]],
      street: ['', [Validators.required]],
      state_red: ['', [Validators.required]],
      lga_red: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
    });

    this.feedbackForm1.valueChanges.subscribe((data: any) =>
      this.onValueChanged1(data)
    );
    this.onValueChanged1(); // (re)set validation messages now
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
    this.feedbackForm1.get('street').reset();
    this.feedbackForm1.get('house').reset();
    this.feedbackForm1.get('zipcode').reset();
  }

  Submit() {
    this.onValueChanged1();
    const feed1 = this.feedbackFormDirective1.invalid;
    if (feed1) {
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
        address: this.feedback1.street,
        house_no: this.feedback1.house,
        zipcode: this.feedback1.zipcode,
        employment_status: this.floatLabelControl.value,
        state_id: this.feedback1.state_red,
        lga_id: this.feedback1.lga_red,
      };
      // Object.assign(
      //   data,
      //   this.floatLabelControl.value == 'employed' ? this.includedFields : {}
      // );
      this.httpService.postData(BaseUrl.add_ind_payer, data).subscribe(
        (data: any) => {
          this.loading2 = false;
          this.disabled2 = false;
          this.router.navigate(['/dashboard/dashboard2/taxpayer/ind']);
          this.OpenDialog(data.data);
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
    this.onValueChanged1();
    const feed1 = this.feedbackFormDirective1.invalid;

    if (feed1) {
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
      let data: any = {
        first_name: this.editDetails.data.first_name,
        middle_name: this.editDetails.data.middle_name,
        gender: this.editDetails.data.gender,
        dob: this.editDetails.data.dob,
        pob: this.editDetails.data.pob,
        state_origin: this.editDetails.data.state_origin,
        lga: this.editDetails.data.lga,
        nationality: this.editDetails.data.nationality,
        state_id: this.feedback1.state_red || this.editDetails.data.state_id,
        lga_id: this.feedback1.lga_red || this.editDetails.data.lga_id,
        profession_trade:
          this.feedback1.trade || this.editDetails.data.profession_trade,
        employment_category:
          this.floatLabelControl.value ||
          this.editDetails.data.employment_category,
        phone: this.feedback1.contact || this.editDetails.data.phone,
        surname: this.feedback1.surname || this.editDetails.data.surname,
        email: this.feedback1.contact_email || this.editDetails.data.phone,
        address: this.feedback1.street || this.editDetails.data.address,
        house_no: this.feedback1.house || this.editDetails.data.house_no,
        zipcode: this.feedback1.zipcode || this.editDetails.data.zipcode,
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
      this.httpService
        .updateData(
          BaseUrl.delete_update_payer,
          data,
          this.editDetails.data.id + '/'
        )
        .subscribe(
          (data: any) => {
            console.log(data);
            this.Updateloading = false;
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
        let coun = this.state?.filter(
          (name: any) => name?.id == Number(splitt[0]) || name?.name == splitt
        );
        this.lga = coun[0] || '';
        this.AddLga(coun[0]?.id || coun[0] || 0);
      }
    });
  }

  trackCountryField2(): void {
    this.feedbackForm1
      .get('state_red')
      .valueChanges.subscribe((field: string) => {
        if (field === undefined) {
        } else {
          let coun = this.state2?.filter((name: any) => name?.id === field);
          this.lga2 = coun[0] || '';
          this.AddLga2(coun[0]?.id);
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
        this.httpService.getSingleNoAuth(BaseUrl.list_state).subscribe(
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
    this.httpService.getSingleNoAuthID(BaseUrl.get_list_lga, id).subscribe(
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
    this.httpService.getSingleNoAuthID(BaseUrl.get_list_lga, id).subscribe(
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
        this.feedbackForm1.controls['state'].patchValue(data.data.state_origin);
        this.feedbackForm1.controls['state_red'].patchValue(
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
        this.feedbackForm1.patchValue({ street: data.data.address });
        this.feedbackForm1.patchValue({ house: data.data.house_no });
        this.feedbackForm1.patchValue({ zipcode: data.data.zipcode });
        this.feedbackForm1.controls['lga_red'].patchValue(data.data.lga_id.id);
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
