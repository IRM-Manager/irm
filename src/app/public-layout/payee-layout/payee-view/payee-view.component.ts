import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-payee-view',
  templateUrl: './payee-view.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-view.component.scss'],
})
export class PayeeViewComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }
}
