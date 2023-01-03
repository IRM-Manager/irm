import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QrCodeModule } from 'ng-qrcode';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { PayeeDialogComponent } from '../payee-dialog/payee-dialog.component';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    QrCodeModule,
    DateAgoPipe,
  ],
  templateUrl: './payee-view.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-view.component.scss'],
})
export class PayeeViewComponent implements OnInit {
  datas: any;
  datas2: any;
  genLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public shared: ToggleNavService,
    private payeeService: PayeeServiceService,
    private httpService: HttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();
    //
    this.datas = this.payeeService.getMessage();
    if (this.datas) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    //
    this.datas2 = this.payeeService.getAssMessage();
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  back() {
    this.payeeService.setAYearMessage({ yearId: this.datas2.assessment_year });
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/lists']);
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(PayeeDialogComponent, {
      data: {
        type: type,
        data: { data: data, company: this.datas },
      },
    });
  }

  openDialog2(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(PayeeDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  generateBill() {
    this.genLoading = true;
    this.httpService
      .postData(
        BaseUrl.payee_gen_bill +
          `tin=${this.datas.company.state_tin}&assessId=${this.datas2.id}`,
        ''
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.openDialog2(data.data, 'generate_bill');
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

  ngOnInit(): void {
    console.log();
  }
}
