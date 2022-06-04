import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayeeManualInputComponent } from './payee-manual-input.component';

const routes: Routes = [{ path: '', component: PayeeManualInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeManualInputRoutingModule { }
