import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService, private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
