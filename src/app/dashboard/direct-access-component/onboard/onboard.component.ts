import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';

@Component({
  selector: 'app-onboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    DataTablesModule,
    RouterModule,
    FlexLayoutModule,
  ],
  templateUrl: './onboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./onboard.component.scss'],
})
export class OnboardComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log();
  }

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
