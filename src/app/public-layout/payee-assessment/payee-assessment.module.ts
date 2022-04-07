import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeAssessmentRoutingModule } from './payee-assessment-routing.module';
import { PayeeAssessmentComponent } from './payee-assessment.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from "angular-datatables";
import { MatToolbarModule } from '@angular/material/toolbar';
import { StaffIncomeComponent } from '../staff-income/staff-income.component';
import { TaxIncomeComponent } from '../tax-income/tax-income.component';
import { PayeeBillsComponent } from '../payee-bills/payee-bills.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    PayeeAssessmentComponent,
    StaffIncomeComponent,
    TaxIncomeComponent,
    PayeeBillsComponent,
  ],
  imports: [
    CommonModule,
    PayeeAssessmentRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    DataTablesModule,
    MatToolbarModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class PayeeAssessmentModule { }
