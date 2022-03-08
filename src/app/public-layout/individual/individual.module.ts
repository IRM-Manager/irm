import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualRoutingModule } from './individual-routing.module';
import { IndividualComponent } from './individual.component';


@NgModule({
  declarations: [
    IndividualComponent
  ],
  imports: [
    CommonModule,
    IndividualRoutingModule
  ]
})
export class IndividualModule { }
