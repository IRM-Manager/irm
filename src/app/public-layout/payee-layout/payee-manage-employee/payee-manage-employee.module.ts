import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeManageEmployeeRoutingModule } from './payee-manage-employee-routing.module';
import { PayeeManageEmployeeComponent } from './payee-manage-employee.component';
// module
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from 'angular-datatables';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [PayeeManageEmployeeComponent],
  imports: [
    CommonModule,
    PayeeManageEmployeeRoutingModule,
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
    MatMenuModule,
  ],
})
export class PayeeManageEmployeeModule {}
