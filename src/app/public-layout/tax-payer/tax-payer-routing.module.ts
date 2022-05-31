import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxPayerComponent } from './tax-payer.component';

const routes: Routes = [{ path: '', component: TaxPayerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxPayerRoutingModule { }
