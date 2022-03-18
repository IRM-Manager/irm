import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeComponent } from './payee.component';

const routes: Routes = [{ path: '', component: PayeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeRoutingModule { }
