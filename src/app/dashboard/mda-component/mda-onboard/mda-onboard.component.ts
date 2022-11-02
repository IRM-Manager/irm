import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MdaDialogComponent } from '../mda-dialog/mda-dialog.component';

@Component({
  selector: 'app-mda-onboard',
  templateUrl: './mda-onboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./mda-onboard.component.scss'],
})
export class MdaOnboardComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(MdaDialogComponent, {
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
