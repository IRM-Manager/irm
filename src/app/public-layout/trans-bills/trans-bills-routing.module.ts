import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransBillsComponent } from './trans-bills.component';

const routes: Routes = [{ path: '', component: TransBillsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransBillsRoutingModule { }
