import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import {
  donutChartOptions,
  donutChartOptions2,
} from '../../../_helpers/donutChartOptions';

@Component({
  selector: 'app-dashboard3',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './dashboard3.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard3.component.scss'],
})
export class Dashboard3Component implements OnInit {
  donutChart = new Chart(donutChartOptions);
  donutChart2 = new Chart(donutChartOptions2);

  constructor() {}

  ngOnInit(): void {
    console.log();
  }
}
