import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { vehicle_details } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
// state management
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { AddVehicleitems } from '../../../../actions/irm.action';
import { Vehicleitems } from '../../../models/irm';

@Component({
  selector: 'app-vehicle-reg-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
  ],
  templateUrl: './vehicle-reg-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg-details.component.scss'],
})
export class VehicleRegDetailsComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: vehicle_details;
  plateMsg: any;
  loading = false;
  vehicle_error = false;
  vehicle_loading = false;
  datas: any;
  datas2: any;
  vehicleType: any;
  vehicleRegType: any;
  stateVehicleItems: Observable<Vehicleitems[]>;

  formErrors: any = {
    model: '',
    make: '',
    vehicle_type: '',
    no_carry: '',
    vin: '',
    year: '',
    color: '',
    plate: '',
    engine_capacity: '',
    fuel: '',
    vehicle_usage: '',
  };

  validationMessages: any = {
    model: {
      required: 'required.',
    },
    make: {
      required: 'required.',
    },
    year: {
      required: 'required.',
    },
    vehicle_type: {
      required: 'required.',
    },
    no_carry: {
      required: 'required.',
    },
    vin: {
      required: 'required.',
      minlength: 'should not be less than 16 characters',
      maxlength: 'should not be more than 16 characters',
    },
    plate: {
      required: 'required.',
    },
    color: {
      required: 'required.',
    },
    engine_capacity: {
      required: 'required.',
    },
    fuel: {
      required: 'required.',
    },
    vehicle_usage: {
      required: 'required',
    },
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _location: Location,
    private snackBar: MatSnackBar,
    private service: VehicleServiceService,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.stateVehicleItems = store.select(selectAllVehicleitems);
    this.createForm();
    this.authService.checkExpired();
    this.datas = this.service.getRegVehicleMessage();
    this.vehicleType = this.service.getVehicleTypeMessage();
    this.getRegType();
    console.log(this.datas);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      model: ['', [Validators.required]],
      make: ['', [Validators.required]],
      vehicle_type: ['', [Validators.required]],
      no_carry: ['', [Validators.required]],
      vin: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      year: ['', [Validators.required]],
      color: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      engine_capacity: ['', [Validators.required]],
      fuel: ['', [Validators.required]],
      vehicle_usage: [''],
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

  getRegType() {
    this.stateVehicleItems.forEach((e: any) => {
      if (e.length > 0) {
        const data = e[0].data.filter((name: any) => {
          return name?.name.toLowerCase() == 'change of ownership';
        });
        this.vehicleRegType = data[0];
      } else {
        this.httpService
          .getAuthSingle(BaseUrl.vehicle_regtype)
          .subscribe((data: any) => {
            const data2 = data.results.filter((name: any) => {
              return name?.name.toLowerCase() == 'change of ownership';
            });
            this.vehicleRegType = data2[0];
            this.store.dispatch(
              new AddVehicleitems([{ id: 1, data: data.results }])
            );
          });
      }
    });
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
      const vehicle_data: any = {
        vin: this.feedback.vin,
        vehicletype: this.feedback.vehicle_type,
        color: this.feedback.color,
        make: this.feedback.make,
        model: this.feedback.model,
        engine_capacity: this.feedback.engine_capacity,
        fuel_type: this.feedback.fuel,
        vehicle_year: this.feedback.year,
        carrying_capacity: this.feedback.no_carry,
        vehicle_usage: this.feedback.vehicle_usage,
        plate_no: this.feedback.plate,
      };
      vehicle_data.regtype = this.vehicleRegType?.id;
      vehicle_data.tin = this.datas?.state_tin;
      console.log(vehicle_data);
      const plate_data = {
        type: 'assessment',
        data: vehicle_data,
      };
      this.service.setRegMessage2(plate_data);
      this.service.sendClickEvent2();
    }
  }

  getVehicleType() {
    this.vehicle_loading = true;
    this.httpService.getSingleNoAuth(BaseUrl.vehicle_type).subscribe(
      (data: any) => {
        this.vehicle_error = false;
        this.vehicle_loading = false;
        this.vehicleType = data.results;
        this.service.setVehicleTypeMessage(data.results);
      },
      () => {
        this.vehicle_error = true;
        this.vehicle_loading = false;
        this.authService.checkExpired();
      }
    );
  }

  back() {
    this._location.back();
  }

  updateNewData(data: any) {
    this.feedbackForm.controls['vehicle_type'].patchValue(data?.vehicletype);
    this.feedbackForm.controls['engine_capacity'].patchValue(
      data?.engine_capacity
    );
    this.feedbackForm.controls['vehicle_usage'].patchValue(data?.vehicle_usage);
    this.feedbackForm.controls['fuel'].patchValue(data?.fuel_type);
    this.feedbackForm.patchValue({ make: data?.make });
    this.feedbackForm.patchValue({ model: data?.model });
    this.feedbackForm.patchValue({
      no_carry: data?.carrying_capacity,
    });
    this.feedbackForm.patchValue({ vin: data?.vin });
    this.feedbackForm.patchValue({ year: data?.vehicle_year });
    this.feedbackForm.patchValue({ color: data?.color });
    this.feedbackForm.patchValue({ plate: data?.plate_no });
  }

  ngOnInit(): void {
    this.getVehicleType();
    const data: any = this.service.getRegMessage2();
    if (data?.back) {
      this.updateNewData(data?.data);
    }
    console.log();
  }
}
