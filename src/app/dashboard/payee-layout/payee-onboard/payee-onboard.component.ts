import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-onboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule,
  ],
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
    console.log(this.datas);
    if (this.datas) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    //
  }

  ngOnInit(): void {
    console.log();
  }
}
