import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
// import { areaChartOptions } from '../../_helpers/areaChartOptions';
import { AreaChartOptions } from '../../_helpers/oneLineChart';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {

  areaChart = new Chart(AreaChartOptions);

  constructor() { }

  ngOnInit(): void {
  }

}
