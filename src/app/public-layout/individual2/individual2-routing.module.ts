import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Individual2Component } from './individual2.component';

const routes: Routes = [{ path: '', component: Individual2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Individual2RoutingModule { }
