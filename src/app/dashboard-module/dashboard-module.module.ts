import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { PrivateSharedModuleModule } from '../private-shared-module/private-shared-module.module';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    PrivateSharedModuleModule,
  ],
})
export class DashboardModuleModule {}
