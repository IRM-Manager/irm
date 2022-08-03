import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { WitholdingServiceService } from '../service/witholding-service.service';
import { WitholdingDialogComponent } from '../witholding-dialog/witholding-dialog.component';

@Component({
  selector: 'app-witholding-generate-assessment',
  templateUrl: './witholding-generate-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./witholding-generate-assessment.component.scss'],
})
export class WitholdingGenerateAssessmentComponent implements OnInit {
  isdelete = false;
  genLoading = false;
  datas: any;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private _location: Location,
    private service: WitholdingServiceService,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    //
    // this.datas = this.service.getAssMessage();
    // console.log(this.datas);
    // if (this.datas) {
    // } else {
    //   this._location.back();
    // }
    //
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(WitholdingDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  back() {
    this._location.back();
  }

  generateBill() {
    this.openDialog('', 'generate_bill');
    // this.genLoading = true;
    // this.httpService
    //   .postData(
    //     BaseUrl.generate_direct_bill +
    //       `tin=${this.datas.payer.state_tin}&assessId=${this.datas.assessment.id}`,
    //     ''
    //   )
    //   .subscribe(
    //     (data: any) => {
    //       console.log(data);
    //       this.openDialog(data.data, 'generate_bill');
    //       this.genLoading = false;
    //     },
    //     (err) => {
    //       this.genLoading = false;
    //       this.authService.checkExpired();
    //       this.snackBar.open(
    //         err?.error?.message ||
    //           err?.error?.msg ||
    //           err?.error?.detail ||
    //           err?.error?.status ||
    //           'An Error Occured!',
    //         '',
    //         {
    //           duration: 5000,
    //           panelClass: 'error',
    //           horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //         }
    //       );
    //     }
    //   );
  }

  ngOnInit(): void {}
}
