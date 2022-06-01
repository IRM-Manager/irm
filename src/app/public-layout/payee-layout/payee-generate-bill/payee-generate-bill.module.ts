import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeGenerateBillRoutingModule } from './payee-generate-bill-routing.module';
import { PayeeGenerateBillComponent } from './payee-generate-bill.component';
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
  declarations: [
    PayeeGenerateBillComponent
  ],
  imports: [
    CommonModule,
    PayeeGenerateBillRoutingModule,
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
  ]
})
export class PayeeGenerateBillModule { }
