import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeOnboardComponent } from './payee-onboard.component';

const routes: Routes = [{ path: '', component: PayeeOnboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeOnboardRoutingModule { }
