import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransBillsRoutingModule } from './trans-bills-routing.module';
import { TransBillsComponent } from './trans-bills.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from "angular-datatables";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TransBillsComponent
  ],
  imports: [
    CommonModule,
    TransBillsRoutingModule,

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
export class TransBillsModule { }
