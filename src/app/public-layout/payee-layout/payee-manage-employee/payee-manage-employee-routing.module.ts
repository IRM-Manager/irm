import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeManageEmployeeComponent } from './payee-manage-employee.component';

const routes: Routes = [{ path: '', component: PayeeManageEmployeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeManageEmployeeRoutingModule { }
