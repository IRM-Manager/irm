import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css'],
})
export class VehicleDialogComponent implements OnInit {
  manualForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
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

  ngOnInit(): void {
    console.log(this.data);
  }
}
