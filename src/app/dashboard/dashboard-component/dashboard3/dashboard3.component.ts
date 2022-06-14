import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { donutChartOptions, donutChartOptions2 } from '../../../_helpers/donutChartOptions';
import { Options } from 'highcharts';

@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard3.component.scss']
})
export class Dashboard3Component implements OnInit {

  donutChart = new Chart(donutChartOptions);
  donutChart2 = new Chart(donutChartOptions2);

  constructor() { }

  ngOnInit(): void {
  }

}
