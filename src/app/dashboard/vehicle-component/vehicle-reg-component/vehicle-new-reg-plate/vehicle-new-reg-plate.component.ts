import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AddVehicleitems } from 'src/app/actions/irm.action';
import { Vehicleitems } from 'src/app/dashboard/models/irm';
import { offence } from 'src/app/dashboard/shared/form';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-new-reg-plate',
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
    MatExpansionModule,
  ],
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
  loading2 = false;
  reg_loading = false;
  update = false;
  total = 0.0;
  datas: any;
  vehicleRegType: any;
  vehicleRegType2: any[] = [];
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
    private router: Router,
    private dialog: MatDialog,
    private httpService: HttpService,
    private store: Store<AppState>
  ) {
    this.createForm();
    this.createManualForm2();
    this.stateVehicleitems = store.select(selectAllVehicleitems);
    this.authService.checkExpired();
    this.datas = this.service.getRegMessage2();
    const vehicleRegType2: any = this.service.getRegMessage2();
    this.vehicleRegType2 =
      vehicleRegType2?.data?.data?.reg_type?.items_ids ||
      vehicleRegType2?.data2?.revitems ||
      [];
    if (this.datas?.data?.update == true) {
      this.update = true;
    }
    this.getRegType();
    console.log(this.vehicleRegType2);
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

  // generate assessment
  generateAss(generate_bill: Boolean) {
    if (generate_bill == true) {
      this.loading2 = true;
    } else {
      this.loading = true;
    }
    const data = { items: this.vehicleRegType2 };
    this.httpService
      .postData(
        BaseUrl.vehicle_gen_ass +
          `?vehicleId=${this.datas?.data?.data?.id || this.datas?.data?.id}`,
        data
      )
      .subscribe(
        (data: any) => {
          if (generate_bill == true) {
            this.generateBill(data?.data);
          } else {
            this.loading = false;
            this.snackBar.open('Assessment generated successfully', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate([
              '/dashboard/dashboard5/vehicle/reg-vehicle/assessment',
            ]);
          }
        },
        (err) => {
          this.authService.checkExpired();
          this.loading = false;
          this.loading2 = false;
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
  }

  // generate bill
  generateBill(data: any) {
    this.httpService
      .postData(
        BaseUrl.vehicle_gen_bill +
          `?assessId=${data.id}&tin=${
            this.datas?.data?.data?.payer?.state_tin ||
            this.datas?.data?.payer?.state_tin
          }`,
        {}
      )
      .subscribe(
        (data: any) => {
          this.loading2 = false;
          console.log(data.data);
          this.openDialog(
            data?.data[0] || data?.data,
            this.datas?.data?.data || this.datas?.data,
            'generate_bill'
          );
          this.router.navigate(['/dashboard/dashboard5/vehicle/reg-vehicle']);
        },
        (err) => {
          this.authService.checkExpired();
          this.loading2 = false;
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
  }

  openDialog(data: any, data2: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
        data2: data2,
      },
    });
  }

  getRegType() {
    this.reg_loading = true;
    this.stateVehicleitems.forEach((e: any) => {
      if (e.length > 0) {
        if (this.update) {
          const data = e[0].data.filter((name: any) => {
            return name?.name.toLowerCase() == 'renewal registration';
          });
          this.vehicleRegType = data[0]?.items_ids;
        } else {
          const data = e[0].data.filter((name: any) => {
            return name?.name.toLowerCase() == 'new registrations';
          });
          this.vehicleRegType = data[0]?.items_ids;
        }
        this.reg_loading = false;
        console.log(this.vehicleRegType);
      } else {
        this.httpService
          .getAuthSingle(BaseUrl.vehicle_regtype)
          .subscribe((data: any) => {
            if (this.update) {
              const data2 = data.results.filter((name: any) => {
                return name?.name.toLowerCase() == 'renewal registration';
              });
              this.vehicleRegType = data2[0]?.items_ids;
            } else {
              const data2 = data.results.filter((name: any) => {
                return name?.name.toLowerCase() == 'new registrations';
              });
              this.vehicleRegType = data2[0]?.items_ids;
            }
            this.store.dispatch(
              new AddVehicleitems([{ id: 1, data: data.results }])
            );
            this.reg_loading = false;
          }),
          (error: any) => {
            this.reg_loading = false;
            console.log(error);
          };
      }
    });
  }

  removeItem(id: number) {
    this.vehicleRegType2.splice(id, 1);
    this.sumValue();
  }

  addItem(data: any) {
    const check = this.vehicleRegType2.filter((e: any) => {
      return e.id == data.id;
    });
    if (check.length > 0) {
      this.snackBar.open('Item already exists.', '', {
        duration: 3000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.vehicleRegType2.push(data);
      console.log(data);
    }
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
      this.total = 0;
    }
  }

  back() {
    this._location.back();
  }

  ngOnInit(): void {
    this.sumValue();
  }
}
