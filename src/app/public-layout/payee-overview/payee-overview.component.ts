import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
// import { areaChartOptions } from '../../_helpers/areaChartOptions';
import { AreaChartOptions } from '../../_helpers/oneLineChart';
import { Options } from 'highcharts';

@Component({
  selector: 'app-payee-overview',
  templateUrl: './payee-overview.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-overview.component.scss']
})
export class PayeeOverviewComponent implements OnInit {

  areaChart = new Chart(AreaChartOptions);

  constructor() { }

  ngOnInit(): void {
  }

}
