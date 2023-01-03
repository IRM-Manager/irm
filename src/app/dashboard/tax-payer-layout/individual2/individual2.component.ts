import { CommonModule, DatePipe, Location } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
// state management
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
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
  selectAllLocation, selectAllOccupation, selectAllStates
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import {
  AddLocation, AddOccupation, AddStates
} from '../../../actions/irm.action';
import { IndPayer, Locationn, Occupation, States } from '../../models/irm';
import { Individual1, LGA, lgaLogo, STATE, stateLogo } from '../../shared/form';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { TaxpayerDialogComponent } from '../taxpayer-dialog/taxpayer-dialog.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-individual2',
  standalone: true,
  imports: [
    CommonModule,
    LoadingBarRouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
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
  payer_data: any;
  floatLabelControl = new FormControl('employed');
  feedback1!: Individual1;
  includedFields: any;
  isFormDisabled = false;
  bankCtrl: FormControl = new FormControl();
  bankCtrl2: FormControl = new FormControl();
  bankCtrl3: FormControl = new FormControl();
  filteredBanks: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(1);
  filteredBanks2: ReplaySubject<lgaLogo[]> = new ReplaySubject<lgaLogo[]>(1);
  filteredBanks3: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(
    1
  );
  option = STATE;
  options2 = LGA;
  option2 = STATE;
  options3 = LGA;
  searching = false;
  searching2 = false;
  searching3 = false;
  searchError!: string;
  searchError2!: string;
  protected _onDestroy = new Subject<void>();
  stateError: boolean = false;
  stateError2: boolean = false;
  stateLoading = false;
  stateLoading2 = false;
  lgaError: boolean = false;
  lgaLoading = false;
  update = false;
  Updateloading = false;
  state: any;
  state2: any;
  lga: any;
  occLoading = false;
  occError = false;
  list_occupation: any;
  editDetails: any;
  stateStates: Observable<States[]>;
  stateInd: Observable<IndPayer[]>;
  stateLocation: Observable<Locationn[]>;
  stateOccupation: Observable<Occupation[]>;

  formErrors: any = {
    title: '',
    gender: '',
    firstname: '',
    surname: '',
    birth: '',
    state: '',
    lga: '',
    contact: '',
    contact_email: '',
    occupation: '',
    address: '',
    office: '',
    tin: '',
  };

  validationMessages: any = {
    firstname: {
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
    state: {
      required: 'required.',
    },
    lga: {
      required: 'required.',
    },
    occupation: {
      required: 'required.',
    },
    contact: {
      required: 'required.',
    },
    contact_email: {
      required: 'required.',
      email: 'Not a valid email',
    },
    address: {
      required: 'required.',
    },
    office: {
      required: 'required.',
    },
    tin: {
      minlength: 'must be at least 11 characters long.',
      maxlength: 'cannot be more than 11 characters long.',
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
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.authService.checkExpired();
    this.createForm1();
    this.stateStates = store.select(selectAllStates);
    this.stateInd = store.select(selectAllIndPayer);
    this.stateLocation = store.select(selectAllLocation);
    this.stateOccupation = store.select(selectAllOccupation);
    this.editDetails = this.shared.getPayerEditMessage();
    const data = this.shared.getPayerMessage();
    this.payer_data = data;
    if (
      (data == '' || data == undefined || data == null) &&
      (this.editDetails == undefined || this.editDetails == '')
    ) {
      this.router.navigate(['/dashboard/dashboard2/taxpayer']);
    } else {
      this.payer_data = data;
      this.updateNewData();
    }
  }

  displayImage(image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/png;base64,' + image
    );
  }

  updateNewData() {
    if (this.payer_data?.v_type == 'nin') {
      const date = this.payer_data.birthdate.split('-');
      this.feedbackForm1.patchValue({ surname: this.payer_data.surname });
      this.feedbackForm1.patchValue({
        birth: new Date(`${date[1]}/${date[0]}/${date[2]}`),
      });
      this.floatLabelControl = new FormControl(this.payer_data.emplymentstatus);
      this.feedbackForm1.patchValue({ firstname: this.payer_data.firstname });
      this.feedbackForm1.patchValue({ gender: this.payer_data.gender });
      this.feedbackForm1.patchValue({ contact: this.payer_data.telephoneno });
      this.feedbackForm1.patchValue({ contact_email: this.payer_data.data });
      this.feedbackForm1.patchValue({
        address: `${this.payer_data.residence_state} state, ${this.payer_data.residence_lga} lga, ${this.payer_data.residence_Town}, ${this.payer_data.residence_AdressLine1}`,
      });
      this.feedbackForm1.patchValue({ title: this.payer_data.title });
      this.feedbackForm1.controls['firstname'].disable();
      this.feedbackForm1.controls['surname'].disable();
      this.feedbackForm1.controls['gender'].disable();
      this.feedbackForm1.controls['birth'].disable();
    }
  }

  createForm1() {
    this.feedbackForm1 = this.fb.group({
      title: [''],
      firstname: ['', [Validators.required]],
      tin: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      surname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      state: ['', [Validators.required]],
      lga: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      office: ['', [Validators.required]],
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

  submit() {
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
      this.loading = true;

      this.feedback1 = this.feedbackForm1.value;
      let coun = this.state.filter(
        (name: any) => name.name.toLowerCase() == 'gombe'
      );

      const date = this.datepipe.transform(
        this.feedbackForm1.controls['birth'].value,
        'YYYY-MM-dd'
      );
      console.log(date);
      let data: any = {
        first_name: this.payer_data.firstname || this.feedback1.firstname,
        gender: this.payer_data.gender || this.feedback1.gender,
        dob:
          date || this.datepipe.transform(this.feedback1.birth, 'YYYY-MM-dd'),
        state_origin: this.feedback1.state,
        lga_id: this.feedback1.lga,
        occupation: this.feedback1.occupation,
        phone: this.feedback1.contact,
        jtb_tin: this.feedback1.tin || null,
        surname: this.payer_data.surname || this.feedback1.surname,
        email: this.feedback1.contact_email,
        address: this.feedback1.address,
        employment_status: this.floatLabelControl.value,
        state_id: coun[0].id,
        is_verified: this.payer_data.v_type == 'nin' ? true : false,
        office_id: this.feedback1.office,
      };
      // Object.assign(
      //   data,
      //   this.floatLabelControl.value == 'employed' ? this.includedFields : {}
      // );
      console.log(data);
      this.httpService.postData(BaseUrl.add_ind_payer, data).subscribe(
        (data: any) => {
          this.loading = false;
          this.router.navigate(['/dashboard/dashboard2/taxpayer/ind']);
          this.openDialog(data.data);
        },
        (err: any) => {
          console.log(err);
          this.authService.checkExpired();
          this.loading = false;
          this.snackBar.open(
            err?.error?.msg ||
              err?.error?.detail ||
              err.error?.msg?.email ||
              err.error?.msg?.phone ||
              'An Error Occured!',
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
  submitUpdate() {
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

      let coun = this.state.filter(
        (name: any) => name.name.toLowerCase() == 'gombe'
      );

      this.feedback1 = this.feedbackForm1.value;
      let data: any = {
        first_name: this.editDetails.data.first_name,
        gender: this.editDetails.data.gender,
        dob: this.editDetails.data.dob,
        state_origin: this.editDetails.data.state_origin,
        lga_id: this.feedback1.lga,
        occupation: this.feedback1.occupation,
        phone: this.feedback1.contact,
        jtb_tin: this.feedback1.tin || null,
        surname: this.editDetails.data.surname,
        email: this.feedback1.contact_email,
        address: this.feedback1.address,
        employment_status: this.floatLabelControl.value,
        state_id: coun[0].id,
        is_verified: this.editDetails.data.is_verified,
        office_id: this.feedback1.office,
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
            this.snackBar.open('Update individual payer successful', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (err: any) => {
            console.log(err);
            this.authService.checkExpired();
            this.Updateloading = false;
            this.snackBar.open(
              err?.error?.message ||
                err?.error?.detail ||
                err.error?.msg?.email ||
                err.error?.msg?.phone ||
                'An Error Occured',
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

  addState() {
    this.stateLoading = true;
    this.stateStates.forEach((e) => {
      if (e.length > 0) {
        this.option = e[0].data;
        this.state = e[0].data;
        this.filteredBanks.next(e[0].data);
        // update form resident lga
        let coun = e[0].data?.filter(
          (name: any) => name.name.toLowerCase() == 'gombe'
        );
        this.lga = coun[0] || '';
        this.addLga(coun[0]?.id || coun[0] || 0);
        //
        this.stateLoading = false;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_state).subscribe(
          (data: any) => {
            this.option = data.results;
            this.state = data.results;
            this.filteredBanks.next(data.results);
            this.stateLoading = false;
            // update form resident lga
            let coun = data.results?.filter(
              (name: any) => name.name.toLowerCase() == 'gombe'
            );
            this.lga = coun[0] || '';
            this.addLga(coun[0]?.id || coun[0] || 0);
            //
            this.store.dispatch(new AddStates([{ id: 1, data: data.results }]));
          },
          () => {
            this.stateLoading = false;
            this.stateError = true;
          }
        );
      }
    });
    // end of state
  }

  addLga(id: any) {
    this.lgaLoading = true;
    this.httpService.getSingleNoAuthID(BaseUrl.get_list_lga, id).subscribe(
      (data: any) => {
        this.options2 = data.data;
        this.filteredBanks2.next(data.data);
        this.lgaLoading = false;
      },
      () => {
        this.lgaLoading = false;
        this.lgaError = true;
      }
    );
  }

  addLocation() {
    this.stateLoading2 = true;
    this.stateLocation.forEach((e) => {
      if (e.length > 0) {
        this.option2 = e[0].data;
        this.state2 = e[0].data;
        this.filteredBanks3.next(e[0].data);
        this.stateLoading2 = false;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_location).subscribe(
          (data: any) => {
            this.option2 = data.results;
            this.state2 = data.results;
            this.filteredBanks3.next(data.results);
            this.stateLoading2 = false;
            this.store.dispatch(
              new AddLocation([{ id: 1, data: data.results }])
            );
          },
          () => {
            this.stateLoading2 = false;
            this.stateError2 = true;
          }
        );
      }
    });
    // end of location
  }

  addOccupation() {
    this.occLoading = true;
    this.stateOccupation.forEach((e) => {
      if (e.length > 0) {
        this.occLoading = false;
        this.occError = false;
        this.list_occupation = e[0].data;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_occupation).subscribe(
          (data: any) => {
            this.list_occupation = data.results;
            this.occLoading = false;
            this.occError = false;
            this.store.dispatch(
              new AddOccupation([{ id: 1, data: data.results }])
            );
          },
          () => {
            this.occLoading = false;
            this.occError = true;
          }
        );
      }
    });
  }

  disableForm() {
    this.feedbackForm1.controls['firstname'].disable();
    this.feedbackForm1.controls['surname'].disable();
    this.feedbackForm1.controls['gender'].disable();
    this.feedbackForm1.controls['birth'].disable();
    this.feedbackForm1.controls['state'].disable();
  }

  updateValue() {
    if (this.editDetails != undefined) {
      if (this.editDetails.type == 'ind') {
        this.update = true;
        const data = this.editDetails;
        this.feedbackForm1.patchValue({ firstname: data.data.first_name });
        this.feedbackForm1.patchValue({ surname: data.data.surname });
        this.feedbackForm1.patchValue({ tin: data.data.jtb_tin || '' });
        this.feedbackForm1.patchValue({ gender: data.data.gender });
        this.feedbackForm1.patchValue({ birth: data.data.dob });
        this.feedbackForm1.controls['state'].patchValue(data.data.state_origin);
        this.feedbackForm1.controls['lga'].patchValue(data.data.lga_id.id);
        this.feedbackForm1.controls['occupation'].patchValue(
          data.data.occupation.id
        );
        this.floatLabelControl = new FormControl(data.data.employment_status);
        this.feedbackForm1.patchValue({ contact: data.data.phone });
        this.feedbackForm1.patchValue({ contact_email: data.data.email });
        this.feedbackForm1.patchValue({ address: data.data.address });
        this.feedbackForm1.controls['office'].patchValue(data.data.location.id);
      }
    } else {
    }
    if (this.editDetails == undefined || this.editDetails == '') {
    } else {
      this.disableForm();
    }
  }

  openDialog(data: any) {
    this.dialog.open(TaxpayerDialogComponent, {
      data: {
        type: 'success',
        data: data,
      },
    });
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

  ngOnInit(): void {
    this.authService.checkExpired();
    this.initAnimations();
    this.addState();
    this.addLocation();
    this.addOccupation();
    this.updateValue();

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
        () => {
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
        () => {
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
        () => {
          // no errors in our simulated example
          this.searching3 = false;
          // handle error...
        }
      );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.shared.setPayerEditMessage(undefined);
  }
}
