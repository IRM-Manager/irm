import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPrivateSidenavComponent } from './app-private-sidenav.component';
import { PrivateHomeComponent } from '../private-home/private-home.component';

const routes: Routes = [
  {
    path: '',
    component: AppPrivateSidenavComponent,
    children: [{ path: '', component: PrivateHomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPrivateSidenavRoutingModule {}
