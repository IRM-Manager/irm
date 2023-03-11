import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppPublicSidenavRoutingModule } from './app-public-sidenav-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppPublicSidenavRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AppPublicSidenavModule {}
