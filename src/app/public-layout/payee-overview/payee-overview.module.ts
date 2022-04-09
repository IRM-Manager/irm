import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeOverviewRoutingModule } from './payee-overview-routing.module';
import { PayeeOverviewComponent } from './payee-overview.component';
// component
import { PayeeOverview2Component } from '../Payee-overview-component/payee-overview2/payee-overview2.component';
import { PayeeOverview3Component } from '../Payee-overview-component/payee-overview3/payee-overview3.component';
// module
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from "angular-datatables";
import { ChartModule } from 'angular-highcharts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    PayeeOverviewComponent,
    PayeeOverview2Component,
    PayeeOverview3Component
  ],
  imports: [
    CommonModule,
    PayeeOverviewRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    DataTablesModule,
    MatToolbarModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    ChartModule,
    MatMenuModule,
  ]
})
export class PayeeOverviewModule { }
