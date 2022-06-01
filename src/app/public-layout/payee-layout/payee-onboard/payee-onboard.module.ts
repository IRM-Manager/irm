import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeOnboardRoutingModule } from './payee-onboard-routing.module';
import { PayeeOnboardComponent } from './payee-onboard.component';
// module
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    PayeeOnboardComponent
  ],
  imports: [
    CommonModule,
    PayeeOnboardRoutingModule,
    MatBadgeModule
  ]
})
export class PayeeOnboardModule { }
