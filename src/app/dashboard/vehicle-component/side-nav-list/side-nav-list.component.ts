import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
// state management
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/index';
import { HttpService } from 'src/app/services/http.service';
import { AddVehicleitems } from '../../../actions/irm.action';
import { BaseUrl } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../service/vehicle-service.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./side-nav-list.component.scss'],
})
export class SideNavListComponent implements OnInit {
  constructor(
    private router: Router,
    public shared: ToggleNavService,
    private _location: Location,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private httpService: HttpService,
    private store: Store<AppState>,
    private authService: AuthService,
    private service: VehicleServiceService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.vehicleRoute();
      }
    });
    this.vehicleRegtype();
  }

  vehicleRoute() {
    if (this.router.url == '/dashboard/dashboard5/vehicle/change-owner') {
      let owner = document.querySelector('.owner');
      owner?.classList.add('active');
      // penalty
      let offence = document.querySelector('.offence');
      offence?.classList.remove('active');
    } else if (this.router.url == '/dashboard/dashboard5/vehicle/offence') {
      let offence = document.querySelector('.offence');
      offence?.classList.add('active');
      // owner
      let owner = document.querySelector('.owner');
      owner?.classList.remove('active');
    } else {
      // owner
      let owner = document.querySelector('.owner');
      owner?.classList.remove('active');
      // penalty
      let offence = document.querySelector('.offence');
      offence?.classList.remove('active');
    }
  }

  payeeBack() {
    this._location.back();
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
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
    this.httpService.getAuthSingle(BaseUrl.vehicle_regtype).subscribe(
      (data: any) => {
        console.log(data);
        this.store.dispatch(
          new AddVehicleitems([{ id: 1, data: data.results }])
        );
      },
      (err) => {}
    );
  }

  plateStat() {
    this.httpService.getAuthSingle(BaseUrl.vehicle_plate_stat).subscribe(
      (data: any) => {
        console.log(data);
        this.service.setPlateStat(data.data);
      },
      (err) => {
        this.authService.checkExpired();
      }
    );
  }

  vehicleType() {
    this.httpService.getSingleNoAuth(BaseUrl.vehicle_type).subscribe(
      (data: any) => {
        this.service.setVehicleTypeMessage(data.results);
      },
      (err) => {
        this.authService.checkExpired();
      }
    );
  }

  ngOnInit(): void {
    this.plateStat();
    this.vehicleType();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.shared.sendHeaderClickEvent();
  };
}
