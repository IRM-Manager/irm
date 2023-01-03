import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { WitholdingServiceService } from '../service/witholding-service.service';
import { WitholdingDialogComponent } from '../witholding-dialog/witholding-dialog.component';

@Component({
  selector: 'app-witholding-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './witholding-view.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./witholding-view.component.scss'],
})
export class WitholdingViewComponent implements OnInit {
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

  ngOnInit(): void {
    console.log();
  }
}
