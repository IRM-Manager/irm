import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';
// state management
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AppState, selectAllVehicleitems } from 'src/app/reducers/index';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddVehicleitems } from '../../../../actions/irm.action';
import { Vehicleitems } from '../../../models/irm';
import { VehicleNewRegAssessmentComponent } from '../vehicle-new-reg-assessment/vehicle-new-reg-assessment.component';
import { VehicleRegDetailsComponent } from '../vehicle-reg-details/vehicle-reg-details.component';

@Component({
  selector: 'app-change-owner-new-reg',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    VehicleRegDetailsComponent,
    VehicleNewRegAssessmentComponent,
  ],
  templateUrl: './change-owner-new-reg.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./change-owner-new-reg.component.scss'],
})
export class ChangeOwnerNewRegComponent implements OnInit {
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
      if (this.datas?.vehregtype == 'assessment') {
        this.viewMode = 'assessment';
      } else {
        this.viewMode = 'detail';
      }
    } else {
      this.router.navigate([`/dashboard/dashboard5/vehicle/change-owner`]);
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
