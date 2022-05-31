import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxPayerCreateRoutingModule } from './tax-payer-create-routing.module';
import { TaxPayerCreateComponent } from './tax-payer-create.component';

// module
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    TaxPayerCreateComponent
  ],
  imports: [
    CommonModule,
    TaxPayerCreateRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
  ]
})
export class TaxPayerCreateModule { }
