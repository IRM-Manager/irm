import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-change-owner-details',
  templateUrl: './change-owner-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./change-owner-details.component.scss'],
})
export class ChangeOwnerDetailsComponent implements OnInit {
  panelOpenState = false;
  newOwner = true;
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  ngOnInit(): void {
    console.log();
  }
}
