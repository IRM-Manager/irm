import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./onboard.component.scss'],
})
export class OnboardComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }
}
