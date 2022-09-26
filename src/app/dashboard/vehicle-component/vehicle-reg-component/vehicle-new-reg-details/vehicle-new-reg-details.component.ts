import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { vehicle_details } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { AddVehicleitems } from '../../../../actions/irm.action';
import { Vehicleitems } from '../../../models/irm';

@Component({
  selector: 'app-vehicle-new-reg-details',
  templateUrl: './vehicle-new-reg-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg-details.component.scss'],
})
export class VehicleNewRegDetailsComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: vehicle_details;
  plateMsg: any;
  loading = false;
  vehicle_error = false;
  vehicle_loading = false;
  update = false;
  datas: any;
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
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private service: VehicleServiceService,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.stateVehicleItems = store.select(selectAllVehicleitems);
    this.createForm();
    this.authService.checkExpired();
    try {
      const plateMsg: any = this.service.getRegVehicleMessage();
      let plateMsg2 = plateMsg?.filter((data: any) => {
        return data?.isavailable == true;
      });
      this.plateMsg = plateMsg2;
    } catch (err) {}
    this.datas = this.service.getRegVehicleMessage();
    this.vehicleType = this.service.getVehicleTypeMessage();
    this.getRegType();
    console.log(this.datas);
    // const plate_data = {
    //   type: 'plate',
    //   data: data,
    // };
    // this.service.setRegMessage2(plate_data);
    // this.service.sendClickEvent2();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      model: ['', [Validators.required]],
      make: ['', [Validators.required]],
      vehicle_type: ['', [Validators.required]],
      no_carry: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      year: ['', [Validators.required]],
      color: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      engine_capacity: ['', [Validators.required]],
      fuel: ['', [Validators.required]],
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
          return name?.name.toLowerCase() == 'new registrations';
        });
        this.vehicleRegType = data[0];
      } else {
        this.httpService
          .getAuthSingle(BaseUrl.vehicle_regtype)
          .subscribe((data: any) => {
            const data2 = data.results.filter((name: any) => {
              return name?.name.toLowerCase() == 'new registrations';
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
    const feed2 = this.feedbackFormDirective.invalid;
    if (feed2) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading = true;
      this.feedback = this.feedbackForm.value;
      const vehicle_data = {
        vin: this.feedback.vin,
        vehicletype: this.feedback.vehicle_type,
        color: this.feedback.color,
        make: this.feedback.make,
        model: this.feedback.model,
        engine_capacity: this.feedback.engine_capacity,
        fuel_type: this.feedback.fuel,
        vehicle_year: this.feedback.year,
        carrying_capacity: this.feedback.no_carry,
        platenoId: this.feedback.plate['id'],
        vehicle_usage: this.feedback.plate['type'],
      };
      console.log(vehicle_data);
      this.httpService
        .postData(
          BaseUrl.list_vehicle +
            `?tin=${this.datas[0]?.owner.state_tin}&regtype=${this.vehicleRegType?.id}`,
          vehicle_data
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            console.log(data);
            const plate_data = {
              type: 'plate',
              data: data,
            };
            this.service.setRegMessage2(plate_data);
            this.service.sendClickEvent2();
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            console.log(err);
            this.snackBar.open(
              err?.error?.message ||
                err?.error?.msg ||
                err?.error?.detail ||
                err?.error?.status ||
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
    } // end else
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
      (err) => {
        this.vehicle_error = true;
        this.vehicle_loading = false;
        this.authService.checkExpired();
      }
    );
  }

  ngOnInit(): void {
    this.getVehicleType();
  }
}
