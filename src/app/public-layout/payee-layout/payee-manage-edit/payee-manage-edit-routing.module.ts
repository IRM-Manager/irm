import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeManageEditComponent } from './payee-manage-edit.component';

const routes: Routes = [{ path: '', component: PayeeManageEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeManageEditRoutingModule { }
