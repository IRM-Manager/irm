import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { offence } from 'src/app/dashboard/shared/form';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { HttpService } from 'src/app/services/http.service';
import { AddVehicleitems } from 'src/app/actions/irm.action';
//
import { BaseUrl } from 'src/environments/environment';
import { Vehicleitems } from 'src/app/dashboard/models/irm';

@Component({
  selector: 'app-vehicle-new-reg-plate',
  templateUrl: './vehicle-new-reg-plate.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg-plate.component.scss'],
})
export class VehicleNewRegPlateComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: offence;
  plateMsg: any;
  panelOpenState = false;
  loading = false;
  datas: any;

  stateVehicleitems: Observable<Vehicleitems[]>;

  manualForm!: FormGroup;

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
    this.createForm();
    this.createManualForm2();
    this.stateVehicleitems = store.select(selectAllVehicleitems);
    this.authService.checkExpired();
    this.vehicleRegtype();
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

  createManualForm2() {
    this.manualForm = this.fb.group({
      item: [''],
    });
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
      const data = {
        type: 'assessment',
        data: this.feedback,
      };
      this.service.setRegMessage2(data);
      this.service.sendClickEvent2();
      console.log(this.feedback);
    } // end else
  }

  generateAss() {
    const data = {
      type: 'assessment',
      data: this.feedback,
    };
    this.service.setRegMessage2(data);
    this.service.sendClickEvent2();
  }

  back() {
    const data = {
      type: 'detail',
      data: '',
    };
    this.service.setRegMessage2(data);
    this.service.sendClickEvent2();
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

  vehicleRegtype() {
    this.stateVehicleitems?.forEach((e) => {
      if (e.length > 0) {
        const data = e[0].data.filter((name: any) => {
          return name.name == 'new';
        });
        this.datas = data[0];
      } else {
        this.httpService.getAuthSingle(BaseUrl.vehicle_regtype).subscribe(
          (data: any) => {
            const dataa = data.results.filter((name: any) => {
              return name.name == 'new';
            });
            this.datas = dataa[0];
            this.store.dispatch(
              new AddVehicleitems([{ id: 1, data: data.results }])
            );
          },
          (err) => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  ngOnInit(): void {}
}
