import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { WitholdingDialogComponent } from '../witholding-dialog/witholding-dialog.component';

@Component({
  selector: 'app-witholding-sidenav-list',
  templateUrl: './witholding-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./witholding-sidenav-list.component.scss'],
})
export class WitholdingSidenavListComponent implements OnInit {
  constructor(
    private router: Router,
    public shared: ToggleNavService,
    private _location: Location,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  payeeBack() {
    this._location.back();
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(WitholdingDialogComponent, {
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
