import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MDAComponent } from './mda.component';

const routes: Routes = [{ path: '', component: MDAComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MDARoutingModule { }
