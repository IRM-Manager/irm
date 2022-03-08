import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Individual2RoutingModule } from './individual2-routing.module';
import { Individual2Component } from './individual2.component';


@NgModule({
  declarations: [
    Individual2Component
  ],
  imports: [
    CommonModule,
    Individual2RoutingModule
  ]
})
export class Individual2Module { }
