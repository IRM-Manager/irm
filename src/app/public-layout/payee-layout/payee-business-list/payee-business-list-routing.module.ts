import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeBusinessListComponent } from './payee-business-list.component';

const routes: Routes = [{ path: '', component: PayeeBusinessListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeBusinessListRoutingModule { }
