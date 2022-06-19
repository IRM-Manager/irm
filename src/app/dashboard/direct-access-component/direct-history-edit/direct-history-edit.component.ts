import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';

@Component({
  selector: 'app-direct-history-edit',
  templateUrl: './direct-history-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-history-edit.component.scss'],
})
export class DirectHistoryEditComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  redirectToEdit(data: any) {
    console.log(data)
    this.router.navigate(['/dashboard/dashboard5/direct/history/view-edit']);
  }
}
