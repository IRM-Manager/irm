import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from 'src/app/app-routing.module';

import { AppPrivateSidenavRoutingModule } from './app-private-sidenav-routing.module';
// components
import { AppPrivateSidenavComponent } from './app-private-sidenav.component';
import { AppPrivateSidenavListComponent } from '../app-private-sidenav-list/app-private-sidenav-list.component';
import { PrivateHeaderComponent } from '../private-header/private-header.component';
import { PrivateHomeComponent } from '../private-home/private-home.component';
// modules
import { PrivateSharedModuleModule } from '../private-shared-module/private-shared-module.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataTablesModule } from 'angular-datatables';
import { ChartModule } from 'angular-highcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    AppPrivateSidenavComponent,
    AppPrivateSidenavListComponent,
    PrivateHeaderComponent,
    PrivateHomeComponent
  ],
  imports: [
    CommonModule,
    // RouterModule,
    // AppRoutingModule,
    AppPrivateSidenavRoutingModule,
    PrivateSharedModuleModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    DataTablesModule,
    MatToolbarModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    ChartModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatRadioModule,
    FlexLayoutModule,
    MatBadgeModule
  ],
})
export class AppPrivateSidenavModule {}
