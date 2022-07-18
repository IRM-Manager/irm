import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-onboard',
  templateUrl: './vehicle-onboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-onboard.component.scss'],
})
export class VehicleOnboardComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }
}
