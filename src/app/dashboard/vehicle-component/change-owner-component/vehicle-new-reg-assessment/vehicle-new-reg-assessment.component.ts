import {
  Component,
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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { change_owner_vehicle } from 'src/app/dashboard/shared/form';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

import { AppState, selectAllStates } from 'src/app/reducers/index';
import { AddStates } from '../../../../actions/irm.action';
import { States } from '../../../models/irm';
import { STATE, stateLogo } from '../../../shared/form';
import { Store } from '@ngrx/store';
import {
  ReplaySubject,
  Subject,
  Observable,
  debounceTime,
  delay,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-new-reg-assessment',
  templateUrl: './vehicle-new-reg-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg-assessment.component.scss'],
})
export class VehicleNewRegAssessmentComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  panelOpenState = false;
  feedbackForm: any = FormGroup;
  feedback!: change_owner_vehicle;
  loading = false;
  bankCtrl: FormControl = new FormControl();
  filteredBanks: ReplaySubject<stateLogo[]> = new ReplaySubject<stateLogo[]>(1);
  option = STATE;
  searching = false;
  protected _onDestroy = new Subject<void>();
  stateError: boolean = false;
  stateLoading = false;
  state: any;

  stateStates: Observable<States[]>;

  formErrors: any = {
    name: '',
    state: '',
    number: '',
    address: '',
  };

  validationMessages: any = {
    name: {
      required: 'required.',
    },
    state: {
      required: 'required.',
    },
    number: {
      required: 'required.',
    },
    address: {
      required: 'required.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private httpService: HttpService,
    private store: Store<AppState>
  ) {
    this.stateStates = store.select(selectAllStates);
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      state: ['', [Validators.required]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
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

  onSubmit() {
    this.onValueChanged();
    this.feedback = this.feedbackForm.value;
    const feed2 = this.feedbackFormDirective.invalid;
    if (feed2) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.loading = true;
      console.log(this.feedback);
      this.router.navigate([
        '/dashboard/dashboard5/vehicle/change-owner/details',
      ]);
    }
  } // end else

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
        //
        this.stateLoading = false;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_state).subscribe(
          (data: any) => {
            this.option = data.results;
            this.state = data.results;
            this.filteredBanks.next(data.results);
            this.stateLoading = false;
            //
            this.store.dispatch(new AddStates([{ id: 1, data: data.results }]));
          },
          (err) => {
            this.stateLoading = false;
            this.stateError = true;
          }
        );
      }
    });
    // end of state
  }

  ngOnInit(): void {
    this.addState();

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
  }
}
