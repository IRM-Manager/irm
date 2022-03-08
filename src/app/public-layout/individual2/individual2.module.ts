import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Individual2RoutingModule } from './individual2-routing.module';
import { Individual2Component } from './individual2.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
  ]
})
export class Individual2Module { }
