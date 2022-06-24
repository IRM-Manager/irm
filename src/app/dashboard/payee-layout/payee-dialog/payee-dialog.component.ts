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
    if (this.data.type == 'upload_file' || this.data.type == 'manual') {
      dialogRef.disableClose = true;
      console.log(this.uploadForm.value);
    }

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
    if (!this.fileName) {
      this.snackBar.open('No CSV file selected!', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      console.log(this.data.data)
    }
  }


  jsonData =  [
    {
      age: 33,
      average: 98,
      approved: true,
      description: "I am active blogger and Author."
    }
  ];

  download(type: string){
    this.payeeService.downloadFile(this.jsonData, 'jsontocsv', type);
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
