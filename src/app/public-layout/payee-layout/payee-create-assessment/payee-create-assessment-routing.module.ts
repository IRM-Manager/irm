import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeCreateAssessmentComponent } from './payee-create-assessment.component';

const routes: Routes = [{ path: '', component: PayeeCreateAssessmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeCreateAssessmentRoutingModule { }
