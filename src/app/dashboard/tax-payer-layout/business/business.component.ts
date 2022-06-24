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
  selectAllComPayer,
  selectAllProfile,
  selectAllStates
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import {
  AddComPayer,
  AddStates,
  RemoveComPayer
} from '../../../actions/irm.action';
import { DialogComponent } from '../../dialog/dialog.component';
import { ComPayer, Profile, States } from '../../models/irm';
import {
  Business2, LGA,
  lgaLogo,
  STATE,
  stateLogo
} from '../../shared/form';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

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

  @ViewChild('fform3') feedbackFormDirective3: any;

  feedbackForm3: any = FormGroup;
  loading = false;
  disabled = false;

  feedback3!: Business2;
  payer_data: any;

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
  stateComPayer: Observable<ComPayer[]>;

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
    company_type: '',
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
      matDatepickerParse: 'not a valid date',
    },
    contact_num: {
      required: 'required.',
    },
    company_type: {
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
    private router: Router,
    private dialog: MatDialog
  ) {
    this.authService.checkExpired();
    // this.createForm2();
    this.createForm3();
    this.trackCountryField2();
    // state
    this.stateStates = store.select(selectAllStates);
    this.stateProfile = store.select(selectAllProfile);
    this.stateComPayer = store.select(selectAllComPayer);
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

  createForm3() {
    this.feedbackForm3 = this.fb.group({
      org_name: ['', [Validators.required]],
      nature_bus: ['', [Validators.required]],
      num_emp: ['', [Validators.required]],
      date_est: ['', [Validators.required]],
      contact_num: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company_type: ['', [Validators.required]],
      website: [''],
      //
      house: ['', [Validators.required]],
      street: ['', [Validators.required]],
      state_red: ['', [Validators.required]],
      lga_red: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      contact_email: ['', [Validators.required, Validators.email]],
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

  RemoveFormData() {
    this.feedbackForm3.get('street').reset();
    this.feedbackForm3.get('house').reset();
    this.feedbackForm3.get('zipcode').reset();
    this.feedbackForm3.get('org_name').reset();
    this.feedbackForm3.get('nature_bus').reset();
    this.feedbackForm3.get('num_emp').reset();
    this.feedbackForm3.get('date_est').reset();
    this.feedbackForm3.get('website').reset();
    this.feedbackForm3.get('contact_num').reset();
    this.feedbackForm3.get('email').reset();
    this.feedbackForm3.get('company_type').reset();
  }


  Submit() {
    this.onValueChanged3();
    const feed3 = this.feedbackFormDirective3.invalid;
    if (feed3) {
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

      let data = {
        state_id: this.feedback3.state_red,
        lga_id: this.feedback3.lga_red,
        organisation_name: this.feedback3.org_name,
        business_nature: this.feedback3.nature_bus,
        number_employee: this.feedback3.num_emp,
        establishment_date: this.datepipe.transform(
          this.feedback3.date_est,
          'yyyy-MM-dd'
        ),
        office_website_url: this.feedback3.website || '',
        phone: this.feedback3.contact_num,
        email: this.feedback3.email,
        contact_phone: this.feedback3.contact,
        contact_email: this.feedback3.contact_email,
        company_type: this.feedback3.company_type || '',
        address: this.feedback3.street,
        house_no: this.feedback3.house,
        zipcode: this.feedback3.zipcode,
      };
      console.log(data);

      this.httpService.postData(BaseUrl.add_com_payer, data).subscribe(
        (data: any) => {
          this.loading2 = false;
          this.disabled2 = false;
          this.router.navigate(['/dashboard/dashboard2/taxpayer/non']);
          this.OpenDialog(data.data);
        },
        (err: any) => {
          console.log(err);
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
    } // end else
  }

  back() {
    this.shared.setPayerEditMessage(undefined);
    this._location.back();
  }

  trackCountryField2(): void {
    this.feedbackForm3
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
        this.httpService.getSingleNoAuth(BaseUrl.list_state).subscribe(
          (data: any) => {
            this.option2 = data.results;
            this.filteredBanks3.next(data.results);
            this.state2 = data.results;
            this.store.dispatch(new AddStates([{ id: 1, data: data.results }]));
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
    this.feedbackForm3.controls['org_name'].disable();
    this.feedbackForm3.controls['date_est'].disable();
  }

  UpdateValue() {
    if (this.editDetails != undefined) {
      if (this.editDetails.type == 'com') {
        this.update = true;
        const data = this.editDetails;
        this.feedbackForm3.controls['state_red'].patchValue(
          data.data.state_id.id
        );
        this.feedbackForm3.patchValue({ street: data.data.address });
        this.feedbackForm3.patchValue({ house: data.data.house_no });
        this.feedbackForm3.patchValue({ zipcode: data.data.zipcode });
        this.feedbackForm3.controls['lga_red'].patchValue(data.data.lga_id.id);
        this.feedbackForm3.patchValue({ zipcode: data.data.zipcode });
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
        this.feedbackForm3.patchValue({ contact_num: data.data.phone });
        this.feedbackForm3.patchValue({ email: data.data.email });
        this.feedbackForm3.patchValue({ contact: data.data.contact_phone });
        this.feedbackForm3.patchValue({
          contact_email: data.data.contact_email,
        });
        this.feedbackForm3.patchValue({ company_type: data.data.company_type });
      }
    } else {
    }
    if (this.editDetails == undefined || this.editDetails == '') {
    } else {
      this.disableForm();
    }
  }

  SubmitUpdate() {
    this.onValueChanged3();
    const feed3 = this.feedbackFormDirective3.invalid;
    if (feed3) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.Updateloading = true;
      this.feedback3 = this.feedbackForm3.value;
      let dataa = {
        state_id: this.feedback3.state_red || this.editDetails.data.state_id,
        lga_id: this.feedback3.lga_red || this.editDetails.data.lga_id,
        organisation_name: this.editDetails.data.organisation_name,
        business_nature:
          this.feedback3.nature_bus || this.editDetails.data.business_nature,
        number_employee:
          this.feedback3.num_emp || this.editDetails.data.number_employee,
        establishment_date: this.editDetails.data.establishment_date,
        office_website_url:
          this.feedback3.website || this.editDetails.office_website_url,
        phone: this.feedback3.contact_num || this.editDetails.data.phone,
        email: this.feedback3.email || this.editDetails.data.email,
        contact_phone: this.feedback3.contact || this.editDetails.contact_phone,
        contact_email:
          this.feedback3.contact_email || this.editDetails.data.contact_email,
        company_type:
          this.feedback3.company_type || this.editDetails.data.company_type,
        address: this.feedback3.street || this.editDetails.data.street,
        house_no: this.feedback3.house || this.editDetails.data.house,
        zipcode: this.feedback3.zipcode || this.editDetails.data.zipcode,
      };
      this.httpService
        .updateData(
          BaseUrl.delete_update_payer,
          dataa,
          this.editDetails.data.id + '/'
        )
        .subscribe(
          (data: any) => {
            this.Updateloading = false;
            this.router.navigate(['/dashboard/dashboard2/taxpayer/non']);
            this.dialog.closeAll();
            this.OpenDialog(data.data);
          },
          (err: any) => {
            console.log(err);
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

  changePayerData() {
    const data = {
      type: 'change',
      payer_type: 'company',
      cac: this.payer_data?.cac,
      data: this.payer_data,
    };
    this.shared.setPayerMessage(data);
    this.router.navigate(['/dashboard/dashboard22/taxpayer']);
  }

  OpenDialog(data: any) {
    this.dialog.open(DialogComponent, {
      data: {
        type: 'com',
        data: data,
      },
    });
  }

  ///////////////////////////////////////////////////////////////

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

    this.AddState();
    this.UpdateValue();
    this.initAnimations();

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
