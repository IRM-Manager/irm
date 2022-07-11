import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { DirectDialogComponent } from '../direct-dialog/direct-dialog.component';
import { DirectServiceService } from '../service/direct-service.service';

@Component({
  selector: 'app-direct-history-edit',
  templateUrl: './direct-history-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-history-edit.component.scss'],
})
export class DirectHistoryEditComponent implements OnInit {
  isdelete = false;
  datas: any;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private _location: Location,
    private service: DirectServiceService,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    //
    this.datas = this.service.getviewSelfMessage();
    console.log(this.datas);
    if (this.datas) {
    } else {
      this._location.back();
    }
    //
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DirectDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  back() {
    this._location.back();
  }

  //  delete tax payer
  deleteAss() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_paye, this.datas.id + '/')
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          this.snackBar.open('Assessment successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate([`/dashboard/dashboard5/direct/self`]);
        },
        (err) => {
          this.isdelete = false;
          this.authService.checkExpired();
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

  ngOnInit(): void {}

  redirectToEdit(data: any) {
    console.log(data);
    this.router.navigate(['/dashboard/dashboard5/direct/history/view-edit']);
  }
}
