import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Chart, ChartModule } from 'angular-highcharts';
import { AreaChartOptions } from '../../../_helpers/oneLineChart';

@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ChartModule,
  ],
  templateUrl: './dashboard2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard2.component.scss'],
})
export class Dashboard2Component implements OnInit {
  areaChart = new Chart(AreaChartOptions);

  constructor() {}

  ngOnInit(): void {
    console.log();
  }
}
