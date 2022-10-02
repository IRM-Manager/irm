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
import { Vehicleitems } from 'src/app/dashboard/models/irm';
//
import { BaseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-owner-assessment',
  templateUrl: './change-owner-assessment.component.html',
  styleUrls: ['./change-owner-assessment.component.scss'],
})
export class ChangeOwnerAssessmentComponent implements OnInit {
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
    // this.datas = this.service.getRegMessage2();
    // const vehicleRegType2: any = this.service.getRegMessage2();
    // this.vehicleRegType2 =
    //   vehicleRegType2?.data?.data?.reg_type?.items_ids ||
    //   vehicleRegType2?.data2?.revitems;
    // if (this.datas?.data?.update == true) {
    //   this.update = true;
    // }
    // this.getRegType();
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
            this.loading = false;
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
        const data = e[0].data.filter((name: any) => {
          return name?.name.toLowerCase() == 'new registrations';
        });
        this.vehicleRegType = data[0]?.items_ids;
        this.reg_loading = false;
        console.log(this.vehicleRegType);
      } else {
        this.httpService
          .getAuthSingle(BaseUrl.vehicle_regtype)
          .subscribe((data: any) => {
            const data2 = data.results.filter((name: any) => {
              return name?.name.toLowerCase() == 'new registrations';
            });
            this.vehicleRegType = data2[0]?.items_ids;
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
    }
  }

  back() {
    this._location.back();
  }

  ngOnInit(): void {
    this.sumValue();
  }
}
