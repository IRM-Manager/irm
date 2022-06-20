import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  ) {}

  PayeeBack() {
    this._location.back();
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  OpenDialog(data: any, type: string) {
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
