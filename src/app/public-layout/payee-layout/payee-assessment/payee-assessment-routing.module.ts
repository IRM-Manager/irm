import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeAssessmentComponent } from './payee-assessment.component';

const routes: Routes = [{ path: '', component: PayeeAssessmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeAssessmentRoutingModule { }
