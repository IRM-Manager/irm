import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService, private snackBar: MatSnackBar,
    private router: Router, public shared: ToggleNavService) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  StaffIncome() {
    const data = {
      type: 'staff-income',
    }
    this.shared.setMessage(this.data.data);
    this.shared.PayeesendClickEvent(data);
  }

  StaffIncome2() {
    const data = {
      type: 'staff-income',
    }
    this.shared.setMessage(this.data.data);
    this.shared.PayeesendClickEvent(data);
    this.router.navigate(['/dashboard3/taxpayer/payee/staff-income'])
  }


}
