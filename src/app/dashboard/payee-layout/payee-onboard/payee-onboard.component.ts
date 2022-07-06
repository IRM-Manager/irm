import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-onboard',
  templateUrl: './payee-onboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-onboard.component.scss'],
})
export class PayeeOnboardComponent implements OnInit {
  datas: any;

  constructor(
    private payeeService: PayeeServiceService,
    private router: Router
  ) {
    //
    this.datas = this.payeeService.getMessage();
    console.log(this.datas)
    if (this.datas) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    //
  }

  ngOnInit(): void {}
}
