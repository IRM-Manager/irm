import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-admin-console-dialog',
  templateUrl: './admin-console-dialog.component.html',
  styleUrls: ['./admin-console-dialog.component.css']
})
export class AdminConsoleDialogComponent implements OnInit {

  loading = false;
  disabled = false;
  constructor(public dialogRef: MatDialogRef<AdminConsoleDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private authService: AuthService
    ) {
      this.authService.checkExpired();
    }


  //  deactivate activate user
  deactivateActivate() {
    this.loading = true;
    this.disabled = true;
    this.httpService.getAuthSingleID(BaseUrl.activate_deactivate, this.data.data.id).subscribe(
      (data: any) => {
        this.loading = false;
        this.disabled = false;
        this.snackBar.open('Success', '', {
          duration: 3000,
          panelClass: 'success',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.disabled = false;
        this.snackBar.open(
          err?.error?.msg || err?.error?.detail || 'An Error Occured!',
          '',
          {
            duration: 5000,
            panelClass: 'error',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      }
    );
  }


  ngOnInit(): void {
  }

}
