import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { offence } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { HttpService } from 'src/app/services/http.service';
import { AddVehicleitems } from 'src/app/actions/irm.action';
import { Vehicleitems } from 'src/app/dashboard/models/irm';
import { BaseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-offence',
  templateUrl: './vehicle-offence.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-offence.component.scss'],
})
export class VehicleOffenceComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: offence;
  plateMsg: any;
  panelOpenState = false;
  loading = false;
  reg_loading = false;
  vehicleRegType2: any[] = [];
  vehicleRegType: any;
  total = 0;
  datas: any;

  stateVehicleitems: Observable<Vehicleitems[]>;

  formErrors: any = {
    violation: '',
    fine: '',
    penalty: '',
  };

  validationMessages: any = {
    violation: {
      required: 'required.',
    },
    fine: {
      required: 'required.',
    },
    penalty: {
      required: 'required.',
    },
  };

  clickEventSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _location: Location,
    private service: VehicleServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private httpService: HttpService,
    private store: Store<AppState>
  ) {
    this.stateVehicleitems = store.select(selectAllVehicleitems);
    this.createForm();
    this.authService.checkExpired();
    const data: any = this.service.getOffenceMessage();
    this.datas = data?.data;
    this.vehicleRegType2 = data?.data?.revitems;
    this.getRegType();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      violation: ['', [Validators.required]],
      fine: ['', [Validators.required]],
      penalty: ['', [Validators.required]],
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
      console.log(this.feedback);
      this.openDialog('', 'generate_bill');
    } // end else
  }

  back() {
    this._location.back();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  removeItem(id: number) {
    this.vehicleRegType2.splice(id, 1);
    // this.sumValue();
  }

  addItem() {
    // const check = this.vehicleRegType2.filter((e: any) => {
    //   return e.id == data.id;
    // });
    // if (check.length > 0) {
    //   this.snackBar.open('Item already exists.', '', {
    //     duration: 3000,
    //     panelClass: 'error',
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   });
    // } else {
    //   this.vehicleRegType2.push(data);
    // }
    this.sumValue();
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  sumValue() {
    const total = this.vehicleRegType2.reduce((accumulator, value) => {
      return accumulator + value?.amount;
    }, 0);
    if (total) {
      this.total = total;
    } else {
    }
  }

  getRegType() {
    this.reg_loading = true;
    this.stateVehicleitems.forEach((e: any) => {
      if (e.length > 0) {
        const data = e[0].data.filter((name: any) => {
          return name?.name.toLowerCase() == 'change of ownership';
        });
        this.vehicleRegType = data[0]?.items_ids;
        this.reg_loading = false;
        console.log(this.vehicleRegType);
        console.log(e[0].data);
      } else {
        this.httpService
          .getAuthSingle(BaseUrl.vehicle_regtype)
          .subscribe((data: any) => {
            const data2 = data.results.filter((name: any) => {
              return name?.name.toLowerCase() == 'change of ownership';
            });
            this.vehicleRegType = data2[0]?.items_ids;
            this.store.dispatch(
              new AddVehicleitems([{ id: 1, data: data.results }])
            );
            this.reg_loading = false;
            console.log(data);
          }),
          (error: any) => {
            this.reg_loading = false;
            console.log(error);
          };
      }
    });
  }

  ngOnInit(): void {
    console.log();
  }
}
