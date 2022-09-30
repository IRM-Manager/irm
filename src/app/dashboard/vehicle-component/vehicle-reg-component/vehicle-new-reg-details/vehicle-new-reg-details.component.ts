import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { vehicle_details } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { Location } from '@angular/common';
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
  renew = false;
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
    try {
      const plateMsg: any = this.service.getRegVehicleMessage();
      let plateMsg2 = plateMsg?.filter((data: any) => {
        return data?.isavailable == true;
      });
      this.plateMsg = plateMsg2;
    } catch (err) {}
    this.datas = this.service.getRegVehicleMessage();
    this.vehicleType = this.service.getVehicleTypeMessage();
    if (this.datas?.update == true) {
      this.update = true;
      this.datas2 = this.service.getRegMessage2();
      this.updateNewData();
    } else if (this.datas?.renew == true) {
      this.renew = true;
      this.datas2 = this.service.getRegMessage2();
    } else {
    }
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

  updateNewData() {
    this.feedbackForm.controls['vehicle_type'].patchValue(
      this.datas2?.data?.vehicletype?.id
    );
    this.feedbackForm.controls['engine_capacity'].patchValue(
      this.datas2?.data?.engine_capacity
    );
    this.feedbackForm.controls['fuel'].patchValue(this.datas2?.data?.fuel_type);
    this.feedbackForm.patchValue({ make: this.datas2?.data?.make });
    this.feedbackForm.patchValue({ model: this.datas2?.data?.model });
    this.feedbackForm.patchValue({
      no_carry: this.datas2?.data?.carrying_capacity,
    });
    this.feedbackForm.patchValue({ vin: this.datas2?.data?.vin });
    this.feedbackForm.patchValue({ year: this.datas2?.data?.vehicle_year });
    this.feedbackForm.patchValue({ color: this.datas2?.data?.color });
    this.feedbackForm.patchValue({ plate: this.datas2?.data?.plate_no });
    this.feedbackForm.controls['plate'].disable();
    this.feedbackForm.controls['vehicle_type'].disable();
    this.feedbackForm.controls['year'].disable();
    this.feedbackForm.controls['make'].disable();
    this.feedbackForm.controls['model'].disable();
    this.feedbackForm.controls['vin'].disable();
    this.feedbackForm.controls['color'].disable();
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
    if (this.update) {
      this.updateVeh();
    } else {
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
          platenoId: this.feedback?.plate['id'],
          vehicle_usage: !this.renew
            ? this.feedback.plate['type']
            : this.feedback.vehicle_usage,
          plate_no: this.feedback.plate,
        };
        if (this.renew == true) {
          delete vehicle_data?.platenoId;
        } else {
          delete vehicle_data?.plate_no;
        }
        console.log(vehicle_data);
        this.httpService
          .postData(
            this.renew == false
              ? BaseUrl.list_vehicle +
                  `?tin=${this.datas[0]?.owner.state_tin}&regtype=${this.vehicleRegType?.id}`
              : BaseUrl.vehicle_renew +
                  `?tin=${this.datas?.state_tin}&regtype=${this.vehicleRegType?.id}`,
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
  }

  // update
  updateVeh() {
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
        vin: this.datas2?.data?.vin,
        make: this.datas2?.data?.make,
        model: this.datas2?.data?.model,
        vehicle_usage: this.datas2?.data?.vehicle_usage,
        vehicle_year: this.datas2?.data?.vehicle_year,
        color: this.datas2?.data?.color,
        vehicletype: this.datas2?.data?.vehicletype?.id,
        engine_capacity: this.feedback.engine_capacity,
        fuel_type: this.feedback.fuel,
        carrying_capacity: this.feedback.no_carry,
      };
      console.log(vehicle_data);
      this.httpService
        .updateData(
          BaseUrl.list_vehicle,
          vehicle_data,
          this.datas2?.data?.id + '/'
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            console.log(data);
            this.snackBar.open('Vehicle successfully updated!', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this._location.back();
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

  back() {
    this._location.back();
  }

  ngOnInit(): void {
    this.getVehicleType();
  }
}
