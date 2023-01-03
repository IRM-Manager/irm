import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { QrCodeModule } from 'ng-qrcode';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxPrintModule } from 'ngx-print';
import { AppState } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { DirectServiceService } from '../service/direct-service.service';

@Component({
  selector: 'app-direct-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    DataTablesModule,
    MatDialogModule,
    QrCodeModule,
    NgxDocViewerModule,
    NgxPrintModule,
  ],
  templateUrl: './direct-dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-dialog.component.css'],
})
export class DirectDialogComponent implements OnInit {
  manualForm!: FormGroup;
  loading = false;
  errorMsg: any;
  isdelete = false;
  d_document: any;
  i_document: any;

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
    private service: DirectServiceService,
    private sanitizer: DomSanitizer
  ) {
    this.createManualForm2();
    if (this.data.type == 'manual') {
      dialogRef.disableClose = true;
    } else if (this.data.type == 'check_status') {
      this.d_document = this.data.data.document.filter((name: any) => {
        return name.type == 'Deductions';
      });
      this.i_document = this.data.data.document.filter((name: any) => {
        return name.type == 'Income';
      });
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
            if (this.data.type == 'manual') {
              this.router.navigate([
                '/dashboard/dashboard5/direct/self/create',
              ]);
            } else {
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

  //  delete generated bill
  deleteBill() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_direct_bill, this.data.data.id + '/')
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

  openDialog(data: any, type: string) {
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  displayImage(image: any) {
    // return this.sanitizer.bypassSecurityTrustResourceUrl(
    //   BaseUrl.server_image + image
    // );
    return BaseUrl.server_image + image;
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
