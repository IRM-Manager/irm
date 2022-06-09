import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from 'src/app/app-routing.module';

import { AppPublicSidenavRoutingModule } from './app-public-sidenav-routing.module';
// components
import { AppPublicSidenavComponent } from './app-public-sidenav.component';
import { AppPublicSidenavListComponent } from '../app-public-sidenav-list/app-public-sidenav-list.component';
import { HeaderComponent } from '../header/header.component';
import { MDAComponent } from '../mda/mda.component';
import { PayeeAssessmentComponent } from '../payee-layout/payee-assessment/payee-assessment.component';
import { StaffIncomeComponent } from '../staff-income/staff-income.component';
import { TaxIncomeComponent } from '../tax-income/tax-income.component';
import { PayeeBillsComponent } from '../payee-layout/payee-bills/payee-bills.component';
import { PayeeCreateAssessmentComponent } from '../payee-layout/payee-create-assessment/payee-create-assessment.component';
import { PayeeGenerateBillComponent } from '../payee-layout/payee-generate-bill/payee-generate-bill.component';
import { PayeeManageEditComponent } from '../payee-layout/payee-manage-edit/payee-manage-edit.component';
import { Dashboard4Component } from '../dashboard4/dashboard4.component';
import { Dashboard3Component } from '../dashboard3/dashboard3.component';
import { Dashboard2Component } from '../dashboard2/dashboard2.component';
import { PayeeManageEmployeeComponent } from '../payee-layout/payee-manage-employee/payee-manage-employee.component';
import { PayeeManualInputComponent } from '../payee-layout/payee-manual-input/payee-manual-input.component'
import { PayeeOnboardComponent } from '../payee-layout/payee-onboard/payee-onboard.component';
import { PayeeOverviewComponent } from '../payee-layout/payee-overview/payee-overview.component';
import { PayeeOverview2Component } from '../payee-layout/Payee-overview-component/payee-overview2/payee-overview2.component';
import { PayeeOverview3Component } from '../payee-layout/Payee-overview-component/payee-overview3/payee-overview3.component';
import { PayeeViewComponent } from '../payee-layout/payee-view/payee-view.component';
import { TaxPayerComponent } from '../tax-payer/tax-payer.component';
import { TransBillsComponent } from '../trans-bills/trans-bills.component';
import { PayeeComponent } from '../payee/payee.component';
import { BusinessComponent } from '../tax-payer-layout/business/business.component';
import { Individual2Component } from '../tax-payer-layout/individual2/individual2.component';
import { TaxPayerCreateComponent } from '../tax-payer-layout/tax-payer-create/tax-payer-create.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PayeeBusinessListComponent } from '../payee-layout/payee-business-list/payee-business-list.component';
// modules
import { PublicSharedModuleModule } from '../public-shared-module/public-shared-module.module';
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
    AppPublicSidenavComponent,
    AppPublicSidenavListComponent,
    HeaderComponent,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    MDAComponent,
    PayeeAssessmentComponent,
    StaffIncomeComponent,
    TaxIncomeComponent,
    PayeeBillsComponent,
    PayeeCreateAssessmentComponent,
    PayeeGenerateBillComponent,
    PayeeManageEditComponent,
    PayeeManageEmployeeComponent,
    PayeeManualInputComponent,
    PayeeOnboardComponent,
    PayeeOverviewComponent,
    PayeeOverview2Component,
    PayeeOverview3Component,
    PayeeViewComponent,
    TaxPayerComponent,
    TransBillsComponent,
    BusinessComponent,
    PayeeComponent,
    Individual2Component,
    TaxPayerCreateComponent,
    DashboardComponent,
    PayeeBusinessListComponent,
    
  ],
  imports: [
    CommonModule,
    // RouterModule,
    // AppRoutingModule,
    AppPublicSidenavRoutingModule,
    PublicSharedModuleModule,
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
export class AppPublicSidenavModule {}
