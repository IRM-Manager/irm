import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeGenerateBillComponent } from './payee-generate-bill.component';

const routes: Routes = [{ path: '', component: PayeeGenerateBillComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeGenerateBillRoutingModule { }
