import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/index';
import { PayeeServiceService } from '../service/payee-service.service';
import { BaseUrl } from 'src/environments/environment';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-payee-dialog',
  templateUrl: './payee-dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-dialog.component.css'],
})
export class PayeeDialogComponent implements OnInit {
  uploadForm!: FormGroup;
  manualForm!: FormGroup;
  formData = new FormData();
  fileName = '';
  err = '';
  uploadLoading = false;
  datas: any;

  constructor(
    public dialogRef: MatDialogRef<PayeeDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService,
    private payeeService: PayeeServiceService,
    private fb: FormBuilder
  ) {
    this.createUploadForm();
    this.createManualForm2();
    this.datas = this.payeeService.getMessage();
    // if (this.data.type == 'upload_file' || this.data.type == 'manual') {
    //   dialogRef.disableClose = true;
    //   console.log(this.uploadForm.value);
    // }
    this.authService.checkExpired();
  }

  createUploadForm() {
    this.uploadForm = this.fb.group({
      con: [{ value: 'true', disabled: false }],
    });
  }

  createManualForm2() {
    this.manualForm = this.fb.group({
      tin: [''],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.formData = formData;
    }
  }

  continue() {
    this.uploadLoading = true;
    this.dialogRef.disableClose = true;
    if (!this.fileName) {
      this.err = 'No CSV file selected!';
      this.snackBar.open('No CSV file selected!', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.uploadLoading = false;
    } else {
      this.httpService
        .postData(
          BaseUrl.upload_payee +
            `comp_tin=${this.datas.tin}&yearId=${this.data.data.year.id}&is_consolidated=${this.uploadForm.value.con == 'true' ? 'yes' : 'no'}`,
          this.formData
        )
        .subscribe(
          (data: any) => {
            console.log(data);
            this.uploadLoading = false;
            this.dialogRef.disableClose = false;
            this.err = '';
            const datas = {
              data: data,
              error: 'success',
              data2: this.datas,
              is_con: this.uploadForm.value.con == 'true' ? true : false,
              is_con2: this.uploadForm.value.con == 'true' ? 'yes' : 'no',
              year: this.data.data.year
            }
            this.openDialog(datas, 'extract');
          },
          (err) => {
            console.log(err);
            this.uploadLoading = false; 
            this.dialogRef.disableClose = false;
            if(err.status === 403) {
              const data = {
                data: err.error,
                error: 'error',
                data2: this.datas,
                is_con: this.uploadForm.value.con == 'true' ? true : false
              }
              this.openDialog(data, 'extract');
            }else {
              this.err =
              err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              'An Error Occured!';
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
            this.authService.checkExpired();
          }
        );
    }
  }

  jsonData = [
    {
      pension: 'TRUE',
      nhf: 'TRUE',
      hmo: '384',
      other_deductions: '384',
      gross: '500000',
      employee_position: 'MANAGER',
    },
  ];

  jsonData2 = [
    {
      pension: 'TRUE',
      nhf: 'TRUE',
      hmo: '384',
      other_deductions: '384',
      housing: '2994',
      tp: '10000',
      basic: '500000',
      employee_position: 'MANAGER',
    },
  ];

  download(type: string) {
    this.payeeService.downloadFile(
      type == 'con' ? this.jsonData : this.jsonData2,
      type == 'con' ? 'Consolidated' : 'NonConsolidated',
      type
    );
  }

  openDialog(data: any, type: string) {
    this.dialogRef.close();
    this.snackBar.dismiss();
    this.dialog.open(DialogComponent, {
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

  ngOnInit(): void {
    console.log(this.data);
  }
}
