import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeOverviewComponent } from './payee-overview.component';

const routes: Routes = [{ path: '', component: PayeeOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeOverviewRoutingModule { }
