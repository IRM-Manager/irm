import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-approval-review',
  templateUrl: './vehicle-approval-review.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-approval-review.component.scss'],
})
export class VehicleApprovalReviewComponent implements OnInit {
  panelOpenState = false;
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

  ngOnInit(): void {}
}
