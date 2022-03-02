import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateHomeComponent } from './private-home.component';

const routes: Routes = [{ path: '', component: PrivateHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateHomeRoutingModule { }
