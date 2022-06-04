import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import { PublicSharedModuleModule } from '../public-shared-module/public-shared-module.module';

@NgModule({
  declarations: [
    DefaultLayoutComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    PublicSharedModuleModule
 
  ]
})

export class DefaultModuleModule { }
