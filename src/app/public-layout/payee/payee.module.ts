import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeRoutingModule } from './payee-routing.module';
import { PayeeComponent } from './payee.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from "angular-datatables";
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    PayeeComponent
  ],
  imports: [
    CommonModule,
    PayeeRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    DataTablesModule,
    MatToolbarModule
  ]
})
export class PayeeModule { }
