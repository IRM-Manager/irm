import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

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
    private dialog: MatDialog
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.vehicleRoute();
      }
    });
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

  ngOnInit(): void {}

  public onPublicHeaderToggleSidenav = () => {
    this.shared.sendHeaderClickEvent();
  };
}
