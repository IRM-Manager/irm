import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { TaxpayerDialogComponent } from '../taxpayer-dialog/taxpayer-dialog.component';

@Component({
  selector: 'app-taxpayer-sidenav-list',
  templateUrl: './taxpayer-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./taxpayer-sidenav-list.component.scss'],
})
export class TaxpayerSidenavListComponent implements OnInit {
  constructor(
    private router: Router,
    public shared: ToggleNavService,
    private _location: Location,
    public dialog: MatDialog,
  ) {}

  PayeeBack() {
    this._location.back();
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(TaxpayerDialogComponent, {
      data: {
        type: 'success',
      },
    });
  }

  public onPublicHeaderToggleSidenav = () => {
    this.shared.sendHeaderClickEvent();
  };
}
