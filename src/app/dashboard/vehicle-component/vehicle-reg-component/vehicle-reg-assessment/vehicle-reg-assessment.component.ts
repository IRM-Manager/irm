import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleDialogComponent } from '../../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-reg-assessment',
  templateUrl: './vehicle-reg-assessment.component.html',
  styleUrls: ['./vehicle-reg-assessment.component.scss'],
})
export class VehicleRegAssessmentComponent implements OnInit {
  manualForm!: FormGroup;
  panelOpenState = false;
  form: boolean = false;
  hide = false;

  items: any[] = [
    {
      id: 1,
      amount: 3000,
      description: 'rrr',
    },
    {
      id: 2,
      amount: 4000,
      description: 'rrr2',
    },
    {
      id: 3,
      amount: 5000,
      description: 'rrr3',
    },
  ];

  collectedItems: any[] = [];
  selectedId1 = 0;
  selectedId2 = 0;
  selectedId3 = 0;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.createManualForm2();
  }

  createManualForm2() {
    this.manualForm = this.fb.group({
      item: [''],
    });
  }

  changeform() {
    this.form = !this.form;
  }

  chooseItem(id: number) {
    const data = this.items.filter((name: any) => {
      return name.id == id;
    });
    if (id == 1) {
      if (this.selectedId1 == 1) {
        let index: any;
        this.collectedItems.filter((name: any, ind: number) => {
          if (name.id == id) {
            index = ind;
          }
        });
        this.collectedItems.splice(index, 1);
        this.selectedId1 = 0;
      } else {
        this.collectedItems.push(data[0]);
        this.selectedId1 = 1;
      }
    } else if (id == 2) {
      if (this.selectedId2 == 1) {
        let index: any;
        this.collectedItems.filter((name: any, ind: number) => {
          if (name.id == id) {
            index = ind;
          }
        });
        this.collectedItems.splice(index, 1);
        this.selectedId2 = 0;
      } else {
        this.collectedItems.push(data[0]);
        this.selectedId2 = 1;
      }
    } else {
      if (this.selectedId3 == 1) {
        let index: any;
        this.collectedItems.filter((name: any, ind: number) => {
          if (name.id == id) {
            index = ind;
          }
        });
        this.collectedItems.splice(index, 1);
        this.selectedId3 = 0;
      } else {
        this.collectedItems.push(data[0]);
        this.selectedId3 = 1;
      }
    }
    console.log(this.collectedItems);
  }

  generateAss() {
    this.hide = true;
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  ngOnInit(): void {}
}
