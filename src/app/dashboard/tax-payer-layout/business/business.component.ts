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
  selectAllComPayer,
  selectAllLocation,
  selectAllProfile,
  selectAllStates,
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddLocation, AddStates } from '../../../actions/irm.action';
import { ComPayer, Locationn, Profile, States } from '../../models/irm';
import { Business2, LGA, lgaLogo, STATE, stateLogo } from '../../shared/form';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { TaxpayerDialogComponent } from '../taxpayer-dialog/taxpayer-dialog.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnDestroy, OnInit {
  @ViewChild('fform3') feedbackFormDirective3: any;
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;
  feedbackForm3: any = FormGroup;
  loading = false;
  disabled = false;
  feedback3!: Business2;
  payer_data: any;
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
  stateLocation: Observable<Locationn[]>;

  formErrors: any = {
    org_name: '',
    cac: '',
    tin: '',
    date_est: '',
    contact_num: '',
    email: '',
    company_type: '',
    address: '',
    office: '',
    lga: '',
  };

  validationMessages: any = {
    address: {
      required: 'required.',
    },
    org_name: {
      required: 'required.',
    },
    cac: {
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
    office: {
      required: 'required.',
      email: 'Not a valid email.',
    },
    lga: {
      required: 'required.',
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
    this.createForm3();
    // state
    this.stateStates = store.select(selectAllStates);
    this.stateProfile = store.select(selectAllProfile);
    this.stateComPayer = store.select(selectAllComPayer);
    this.stateLocation = store.select(selectAllLocation);
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

  updateNewData() {
    if (this.payer_data?.v_type == 'cac') {
      // this.feedbackForm1.patchValue({ surname: this.payer_data.surname });
      // this.feedbackForm3.controls['tin'].disable();
    }
  }

  createForm3() {
    this.feedbackForm3 = this.fb.group({
      org_name: ['', [Validators.required]],
      cac: ['', [Validators.required]],
      tin: [''],
      date_est: ['', [Validators.required]],
      contact_num: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company_type: ['', [Validators.required]],
      address: ['', [Validators.required]],
      office: ['', [Validators.required]],
      lga: ['', [Validators.required]],
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

  submit() {
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
      this.loading = true;
      this.disabled = true;

      this.feedback3 = this.feedbackForm3.value;

      let data = {
        organisation_name: this.feedback3.org_name,
        business_sector: this.feedback3.company_type,
        dob: this.datepipe.transform(this.feedback3.date_est, 'yyyy-MM-dd'),
        phone: this.feedback3.contact_num,
        is_verified: this.payer_data.v_type == 'cac' ? true : false,
        email: this.feedback3.email,
        address: this.feedback3.address,
        state_id: 1,
        lga_id: this.feedback3.lga,
        office_id: this.feedback3.office,
      };
      console.log(data);
      this.httpService.postData(BaseUrl.add_com_payer, data).subscribe(
        (data: any) => {
          this.loading = false;
          this.disabled = false;
          this.router.navigate(['/dashboard/dashboard2/taxpayer/non']);
          this.openDialog(data.data);
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
          this.disabled = false;
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

  addState() {
    this.stateStates.forEach((e) => {
      if (e.length > 0) {
        let coun = e[0].data?.filter(
          (name: any) => name.name.toLowerCase() == 'gombe'
        );
        this.lga2 = coun[0] || '';
        this.addLga2(coun[0]?.id || coun[0] || 0);
      } else {
        this.httpService
          .getSingleNoAuth(BaseUrl.list_state)
          .subscribe((data: any) => {
            let coun = data.results?.filter(
              (name: any) => name.name.toLowerCase() == 'gombe'
            );
            this.lga2 = coun[0] || '';
            this.addLga2(coun[0]?.id || coun[0] || 0);
            //
            this.store.dispatch(new AddStates([{ id: 1, data: data.results }]));
          });
      }
    });
    // end of state
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

  addLga2(id: number) {
    this.lgaLoading2 = true;
    this.httpService.getSingleNoAuthID(BaseUrl.get_list_lga, id).subscribe(
      (data: any) => {
        this.options3 = data.data;
        this.filteredBanks4.next(data.data);
        this.lgaLoading2 = false;
      },
      () => {
        this.lgaLoading2 = false;
        this.lgaError2 = true;
      }
    );
  }

  disableForm() {
    this.feedbackForm3.controls['org_name'].disable();
    this.feedbackForm3.controls['date_est'].disable();
    this.feedbackForm3.controls['tin'].disable();
  }

  updateValue() {
    if (this.editDetails != undefined) {
      if (this.editDetails.type == 'com') {
        this.update = true;
        const data = this.editDetails;
        this.feedbackForm3.patchValue({
          org_name: data.data.organisation_name,
        });
        this.feedbackForm3.patchValue({ cac: data.data.state_tin });
        this.feedbackForm3.patchValue({ tin: data.data.jtb_tin });
        this.feedbackForm3.patchValue({
          date_est: data.data.dob,
        });
        this.feedbackForm3.patchValue({ contact_num: data.data.phone });
        this.feedbackForm3.patchValue({ email: data.data.email });
        this.feedbackForm3.patchValue({
          company_type: data.data.business_sector,
        });
        this.feedbackForm3.patchValue({ address: data.data.address });
        this.feedbackForm3.controls['office'].patchValue(data.data.location.id);
        this.feedbackForm3.controls['lga'].patchValue(data.data.lga_id.id);
      }
    } else {
    }
    if (this.editDetails == undefined || this.editDetails == '') {
    } else {
      this.disableForm();
    }
  }

  submitUpdate() {
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
        organisation_name: this.editDetails.data.organisation_name,
        business_sector: this.editDetails.data.business_sector,
        dob: this.editDetails.data.dob,
        phone: this.feedback3.contact_num,
        is_verified: this.editDetails.data.is_verified,
        email: this.feedback3.email,
        address: this.feedback3.address,
        state_id: this.editDetails.data.state_id.id,
        lga_id: this.feedback3.lga,
        office_id: this.feedback3.office,
      };
      this.httpService
        .updateData(
          BaseUrl.delete_update_payer,
          dataa,
          this.editDetails.data.id + '/'
        )
        .subscribe(
          () => {
            this.Updateloading = false;
            this.router.navigate(['/dashboard/dashboard2/taxpayer/non']);
            this.snackBar.open('Update company payer successful', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (err: any) => {
            console.log(err);
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

  openDialog(data: any) {
    this.dialog.open(TaxpayerDialogComponent, {
      data: {
        type: 'success',
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

  back() {
    this.shared.setPayerEditMessage(undefined);
    this._location.back();
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.addState();
    this.addLocation();
    this.updateValue();
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
        () => {
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
        () => {
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
