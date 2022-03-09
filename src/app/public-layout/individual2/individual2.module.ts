import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Individual2RoutingModule } from './individual2-routing.module';
import { Individual2Component } from './individual2.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    Individual2Component
  ],
  imports: [
    CommonModule,
    Individual2RoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule
  ]
})
export class Individual2Module { }
