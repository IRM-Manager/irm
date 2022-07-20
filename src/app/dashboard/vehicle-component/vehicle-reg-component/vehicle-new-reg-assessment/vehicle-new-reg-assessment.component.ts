import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-new-reg-assessment',
  templateUrl: './vehicle-new-reg-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg-assessment.component.scss'],
})
export class VehicleNewRegAssessmentComponent implements OnInit {
  manualForm!: FormGroup;
  panelOpenState = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.createManualForm2();
  }

  createManualForm2() {
    this.manualForm = this.fb.group({
      item: [''],
    });
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
    this.router.navigate(['/dashboard/dashboard5/vehicle/reg-vehicle']);
  }

  ngOnInit(): void {}
}
