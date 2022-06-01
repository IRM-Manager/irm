import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeGenerateBillRoutingModule } from './payee-generate-bill-routing.module';
import { PayeeGenerateBillComponent } from './payee-generate-bill.component';


@NgModule({
  declarations: [
    PayeeGenerateBillComponent
  ],
  imports: [
    CommonModule,
    PayeeGenerateBillRoutingModule
  ]
})
export class PayeeGenerateBillModule { }
