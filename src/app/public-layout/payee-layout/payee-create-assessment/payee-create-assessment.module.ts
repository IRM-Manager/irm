import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeCreateAssessmentRoutingModule } from './payee-create-assessment-routing.module';
import { PayeeCreateAssessmentComponent } from './payee-create-assessment.component';


@NgModule({
  declarations: [
    PayeeCreateAssessmentComponent
  ],
  imports: [
    CommonModule,
    PayeeCreateAssessmentRoutingModule
  ]
})
export class PayeeCreateAssessmentModule { }
