import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { DirectServiceService } from '../service/direct-service.service';

@Component({
  selector: 'app-direct-dialog',
  templateUrl: './direct-dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-dialog.component.css'],
})
export class DirectDialogComponent implements OnInit {
  manualForm!: FormGroup;
  loading = false;
  errorMsg: any;

  constructor(
    public dialogRef: MatDialogRef<DirectDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService,
    private fb: FormBuilder,
    private service: DirectServiceService
  ) {
    this.createManualForm2();
    if (this.data.type == 'manual' || this.data.type == 'check_status') {
      dialogRef.disableClose = true;
    }
    this.authService.checkExpired();
  }

  createManualForm2() {
    this.manualForm = this.fb.group({
      tin: [''],
    });
  }

  checkTin() {
    this.loading = true;
    console.log(this.manualForm.value);
    this.httpService
      .getAuthSingle(BaseUrl.get_payer_tin + `${this.manualForm.value.tin}`)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.dialogRef.disableClose = false;
          console.log(data);
          if (data.data.payer_type == 'individual') {
            const setData = {
              update: false,
              data: data.data,
            };
            this.service.setMessage(setData);
            if(this.data.type == 'manual') {
              this.router.navigate(['/dashboard/dashboard5/direct/self/create']);
            }else{
              this.router.navigate(['/dashboard/dashboard5/direct/boj/create']);
            }
            this.dialogRef.close();
          } else {
            this.errorMsg = 'Invalid GTin';
            this.snackBar.open('Invalid GTin', '', {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        },
        (err) => {
          this.authService.checkExpired();
          this.loading = false;
          this.dialogRef.disableClose = false;
          this.errorMsg =
            err?.error?.message ||
            err?.error?.msg ||
            err?.error?.detail ||
            err?.error?.status ||
            'An Error Occured!';
          console.log(err);
          this.snackBar.open(
            err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              'An Error Occured!',
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


  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
