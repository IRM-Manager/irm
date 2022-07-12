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
  genLoading = false;
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
    if (this.datas?.da_type == 'boj') {
      this.service.setBYearMessage({
        yearId: this.datas.assessment.assessment_year,
      });
      this.router.navigate([`/dashboard/dashboard5/direct/boj`]);
    } else {
      this.service.setAYearMessage({
        yearId: this.datas.assessment.assessment_year,
      });
      this.router.navigate([`/dashboard/dashboard5/direct/self`]);
    }
  }

  //  delete tax payer
  deleteAss() {
    this.isdelete = true;
    this.httpService
      .deleteData(
        this.datas?.da_type == 'boj' ? BaseUrl.list_boj : BaseUrl.list_direct,
        this.datas.id + '/'
      )
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          this.snackBar.open('Assessment successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          if (this.datas?.da_type == 'boj') {
            this.service.setBYearMessage({
              yearId: this.datas.assessment.assessment_year,
            });
            this.router.navigate([`/dashboard/dashboard5/direct/boj`]);
          } else {
            this.service.setAYearMessage({
              yearId: this.datas.assessment.assessment_year,
            });
            this.router.navigate([`/dashboard/dashboard5/direct/self`]);
          }
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

  generateBill() {
    this.genLoading = true;
    this.httpService
      .postData(
        BaseUrl.generate_direct_bill +
          `tin=${this.datas.payer.state_tin}&assessId=${this.datas.assessment.id}`,
        ''
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.openDialog(data.data, 'generate_bill');
          this.genLoading = false;
        },
        (err) => {
          this.genLoading = false;
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

  edit() {
    if (this.datas?.da_type == 'boj') {
      const setData = {
        update: true,
        data: this.datas,
      };
      this.service.setMessage(setData);
      this.router.navigate(['/dashboard/dashboard5/direct/boj/create']);
    } else {
      const setData = {
        update: true,
        data: this.datas,
      };
      this.service.setMessage(setData);
      this.router.navigate(['/dashboard/dashboard5/direct/self/create']);
    }
  }

  ngOnInit(): void {}
}
