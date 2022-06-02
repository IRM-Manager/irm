import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeViewComponent } from './payee-view.component';

const routes: Routes = [{ path: '', component: PayeeViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeViewRoutingModule { }
