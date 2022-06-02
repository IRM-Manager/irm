import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeManageEditRoutingModule } from './payee-manage-edit-routing.module';
import { PayeeManageEditComponent } from './payee-manage-edit.component';
// module
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    PayeeManageEditComponent
  ],
  imports: [
    CommonModule,
    PayeeManageEditRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule,
  ]
})
export class PayeeManageEditModule { }
