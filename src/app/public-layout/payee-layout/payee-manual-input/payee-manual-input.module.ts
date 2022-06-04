import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeManualInputRoutingModule } from './payee-manual-input-routing.module';
import { PayeeManualInputComponent } from './payee-manual-input.component';
// module
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [PayeeManualInputComponent],
  imports: [
    CommonModule,
    PayeeManualInputRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
})
export class PayeeManualInputModule {}
