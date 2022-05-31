import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxPayerCreateComponent } from './tax-payer-create.component';

const routes: Routes = [{ path: '', component: TaxPayerCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxPayerCreateRoutingModule { }
