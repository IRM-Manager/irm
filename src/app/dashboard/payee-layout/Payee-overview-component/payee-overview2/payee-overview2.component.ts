import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { donutChartOptions, donutChartOptions2 } from '../../../../_helpers/donutChartOptions';
import { Options } from 'highcharts';

@Component({
  selector: 'app-payee-overview2',
  templateUrl: './payee-overview2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-overview2.component.scss']
})
export class PayeeOverview2Component implements OnInit {

  donutChart = new Chart(donutChartOptions);
  donutChart2 = new Chart(donutChartOptions2);

  constructor() { }

  ngOnInit(): void {
  }

}
