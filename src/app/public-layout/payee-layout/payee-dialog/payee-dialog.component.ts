import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { IndPayer, ComPayer, Year } from '../../../models/irm';
import {
  AppState,
  selectAllIndPayer,
  selectAllComPayer,
  selectAllYear,
} from 'src/app/reducers/index';
import {
  AddIndPayer,
  RemoveIndPayer,
  AddComPayer,
  RemoveComPayer,
  AddYear,
} from '../../../actions/irm.action';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private store: Store<AppState>,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createUploadForm();
    this.createManualForm2();
    if (this.data.type == 'upload_file' || this.data.type == 'manual') {
      dialogRef.disableClose = true;
      console.log(this.uploadForm.value)
    }

    this.authService.checkExpired();
  }

  createUploadForm() {
    this.uploadForm = this.fb.group({
      con: [true],
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

  ngOnInit(): void {
    console.log(this.data);
  }
}
