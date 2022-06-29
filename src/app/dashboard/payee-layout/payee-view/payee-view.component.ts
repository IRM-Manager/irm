import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-view',
  templateUrl: './payee-view.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-view.component.scss'],
})
export class PayeeViewComponent implements OnInit {

  datas: any;
  datas2: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    public shared: ToggleNavService,
    private payeeService: PayeeServiceService) {
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

  back(){
    this.payeeService.setAYearMessage({yearId: this.datas2.assessment_year});
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/lists'])
  }

  ngOnInit(): void {}

}
