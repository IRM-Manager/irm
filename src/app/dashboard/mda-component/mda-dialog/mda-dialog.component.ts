import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// state management
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { MdaServiceService } from '../service/mda-service.service';

@Component({
  selector: 'app-mda-dialog',
  templateUrl: './mda-dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./mda-dialog.component.css'],
})
export class MdaDialogComponent implements OnInit {
  manualForm!: FormGroup;
  loading = false;
  isdelete = false;

  constructor(
    public dialogRef: MatDialogRef<MdaDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private service: MdaServiceService,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createManualForm2();
    if (this.data.type == 'manual') {
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
    if (this.data.type == 'manual') {
      this.loading = true;
      console.log(this.manualForm.value);
      this.httpService
        .getAuthSingle(BaseUrl.get_payer_tin + `${this.manualForm.value.tin}`)
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.dialogRef.disableClose = false;
            console.log(data);
            if (this.data.type == 'manual') {
              const plate_data = {
                type: 'mda',
                data: data?.data,
              };
              this.service.setMessage(plate_data);
              this.router.navigate(['/dashboard/dashboard3/mda/generate']);
            }
            this.dialogRef.close({ data: data.data });
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
            this.dialogRef.disableClose = false;
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
  }

  //  delete generated bill
  deleteBill() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.vehicle_gen_bill, this.data.data.id + '/')
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          this.snackBar.open('Assessment Bill successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close({ id: this.data.data.id });
        },
        (err) => {
          console.log(err);
          this.isdelete = false;
          this.authService.checkExpired();
          this.snackBar.open(
            err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              err?.error ||
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

  openDialog(data: any, type: string) {
    this.dialogRef.close();
    this.dialog.open(MdaDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
