import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddVehicleitems } from '../../../../actions/irm.action';
import { Vehicleitems } from '../../../models/irm';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { VehicleNewRegDetailsComponent } from '../vehicle-new-reg-details/vehicle-new-reg-details.component';
import { VehicleNewRegPlateComponent } from '../vehicle-new-reg-plate/vehicle-new-reg-plate.component';

@Component({
  selector: 'app-vehicle-new-reg',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    VehicleNewRegDetailsComponent,
    VehicleNewRegPlateComponent,
  ],
  templateUrl: './vehicle-new-reg.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg.component.scss'],
})
export class VehicleNewRegComponent implements OnInit {
  viewMode = 'detail';
  clickEventSubscription?: Subscription;
  datas: any;
  stateVehicleItems: Observable<Vehicleitems[]>;

  constructor(
    private service: VehicleServiceService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.stateVehicleItems = store.select(selectAllVehicleitems);
    this.authService.checkExpired();
    this.clickEventSubscription = this.service
      .getClickEvent2()
      .subscribe((data: any) => {
        const datas: any = this.service.getRegMessage2();
        this.viewMode = datas.type;
      });
    this.datas = this.service.getRegVehicleMessage();
    if (this.datas) {
      if (this.datas?.vehregtype == 'plate') {
        this.viewMode = 'plate';
      } else {
        this.viewMode = 'detail';
      }
    } else {
      this.router.navigate([`/dashboard/dashboard5/vehicle/reg-vehicle`]);
    }
    this.getRegType();
  }

  getRegType() {
    this.stateVehicleItems.forEach((e: any) => {
      if (e.length > 0) {
      } else {
        this.httpService
          .getAuthSingle(BaseUrl.vehicle_regtype)
          .subscribe((data: any) => {
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
