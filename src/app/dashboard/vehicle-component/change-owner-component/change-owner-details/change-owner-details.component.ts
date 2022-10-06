import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';
// state management
import { Store } from '@ngrx/store';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { AddVehicleitems } from '../../../../actions/irm.action';
import { Vehicleitems } from '../../../models/irm';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-change-owner-details',
  templateUrl: './change-owner-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./change-owner-details.component.scss'],
})
export class ChangeOwnerDetailsComponent implements OnInit {
  panelOpenState = false;
  newOwner = false;
  datas: any;
  loading = false;
  update = false;
  vehicleRegType: any;

  stateVehicleItems: Observable<Vehicleitems[]>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: VehicleServiceService,
    private router: Router,
    private httpService: HttpService,
    private _location: Location,
    private store: Store<AppState>
  ) {
    this.stateVehicleItems = store.select(selectAllVehicleitems);
    this.datas = this.service.getOwnerViewMessage();
    console.log(this.datas);
    if (this.datas) {
      if (this.datas?.new) {
        this.newOwner = true;
      }
      if (this.datas?.update) {
        this.update = true;
      }
    } else {
      this.router.navigate([`/dashboard/dashboard5/vehicle/change-owner`]);
    }
    this.getRegType();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
    // after dialog close
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.datas.new = result?.data;
        this.newOwner = true;
      } else if (result?.id) {
        this._location.back();
      }
    });
  }

  process() {
    this.loading = true;
    this.httpService
      .postData(
        BaseUrl.vehicle_owner +
          `?vehicleId=${this.datas?.old?.id}&tin=${this.datas?.new?.state_tin}&regtype=${this.vehicleRegType?.id}`,
        {}
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          console.log(data);
          const data2 = {
            data: data?.data?.vehicleId,
          };
          this.service.setRegMessage2(data2);
          this.router.navigate([
            '/dashboard/dashboard5/vehicle/change-owner/assessment',
          ]);
        },
        (err) => {
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

  ngOnInit(): void {
    console.log();
  }
}
