import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPublicSidenavRoutingModule } from './app-public-sidenav-routing.module';
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
import { MatChipsModule } from '@angular/material/chips';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { QrCodeModule } from 'ng-qrcode';
// import { CdkMenuModule } from '@angular/cdk/menu';
// components
import { AppPublicSidenavComponent } from './app-public-sidenav.component';
import { MDAComponent } from '../mda-component/mda/mda.component';
import { PayeeAssessmentComponent } from '../payee-layout/payee-assessment/payee-assessment.component';
import { StaffIncomeComponent } from '../staff-income/staff-income.component';
import { TaxIncomeComponent } from '../tax-income/tax-income.component';
import { PayeeBillsComponent } from '../payee-layout/payee-bills/payee-bills.component';
import { PayeeCreateAssessmentComponent } from '../payee-layout/payee-create-assessment/payee-create-assessment.component';
import { PayeeGenerateBillComponent } from '../payee-layout/payee-generate-bill/payee-generate-bill.component';
import { PayeeManageEditComponent } from '../payee-layout/payee-manage-edit/payee-manage-edit.component';
import { PayeeManageEmployeeComponent } from '../payee-layout/payee-manage-employee/payee-manage-employee.component';
import { PayeeManualInputComponent } from '../payee-layout/payee-manual-input/payee-manual-input.component';
import { PayeeOnboardComponent } from '../payee-layout/payee-onboard/payee-onboard.component';
import { PayeeOverviewComponent } from '../payee-layout/payee-overview/payee-overview.component';
import { PayeeViewComponent } from '../payee-layout/payee-view/payee-view.component';
import { TaxPayerComponent } from '../tax-payer-layout/tax-payer/tax-payer.component';
import { TransBillsComponent } from '../trans-bills/trans-bills.component';
import { PayeeComponent } from '../payee-layout/payee/payee.component';
import { BusinessComponent } from '../tax-payer-layout/business/business.component';
import { Individual2Component } from '../tax-payer-layout/individual2/individual2.component';
import { TaxPayerCreateComponent } from '../tax-payer-layout/tax-payer-create/tax-payer-create.component';
import { DashboardComponent } from '../dashboard-component/dashboard/dashboard.component';
import { PayeeBusinessListComponent } from '../payee-layout/payee-business-list/payee-business-list.component';
import { AdminConsoleComponent } from '../admin-console-component/admin-console/admin-console.component';
import { Dashboard4Component } from '../dashboard-component/dashboard4/dashboard4.component';
import { Dashboard3Component } from '../dashboard-component/dashboard3/dashboard3.component';
import { Dashboard2Component } from '../dashboard-component/dashboard2/dashboard2.component';
import { PayeeOverview2Component } from '../payee-layout/Payee-overview-component/payee-overview2/payee-overview2.component';
import { PayeeOverview3Component } from '../payee-layout/Payee-overview-component/payee-overview3/payee-overview3.component';
import { AddUserComponent } from '../admin-console-component/add-user/add-user.component';
import { EditUserComponent } from '../admin-console-component/edit-user/edit-user.component';
import { ViewUserComponent } from '../admin-console-component/view-user/view-user.component';
import { MdaOnboardComponent } from '../mda-component/mda-onboard/mda-onboard.component';
import { MdaTableComponent } from '../mda-component/mda-table/mda-table.component';
import { OnboardComponent } from '../direct-access-component/onboard/onboard.component';
import { DirectSelfComponent } from '../direct-access-component/direct-self/direct-self.component';
import { DirectBojComponent } from '../direct-access-component/direct-boj/direct-boj.component';
import { DirectHistoryComponent } from '../direct-access-component/direct-history/direct-history.component';
import { DirectBillComponent } from '../direct-access-component/direct-bill/direct-bill.component';
import { DirectHistoryEditComponent } from '../direct-access-component/direct-history-edit/direct-history-edit.component';
import { DirectHistoryViewEditComponent } from '../direct-access-component/direct-history-view-edit/direct-history-view-edit.component';
import { VehicleBillsComponent } from '../vehicle-component/vehicle-bills/vehicle-bills.component';
import { VehicleOnboardComponent } from '../vehicle-component/vehicle-onboard/vehicle-onboard.component';
import { VehicleRegComponent } from '../vehicle-component/vehicle-reg-component/vehicle-reg/vehicle-reg.component';
import { VehicleRenewEditComponent } from '../vehicle-component/vehicle-renew-edit/vehicle-renew-edit.component';
import { VehicleRenewViewComponent } from '../vehicle-component/vehicle-renew-view/vehicle-renew-view.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { ProfileViewComponent } from '../profile-component/profile-view/profile-view.component';
import { ProfileEditComponent } from '../profile-component/profile-edit/profile-edit.component';
import { ProfileChangePasswordComponent } from '../profile-component/profile-change-password/profile-change-password.component';
import { AdminDepartmentComponent } from '../admin-console-component/admin-department/admin-department.component';
import { AdminLocationComponent } from '../admin-console-component/admin-location/admin-location.component';
import { ListUserDepLocComponent } from '../admin-console-component/list-user-dep-loc/list-user-dep-loc.component';

@NgModule({
  declarations: [
    // components  // components which has route and chart comes here....while components which do not goes to public-shared-module
    AppPublicSidenavComponent,
    MDAComponent,
    PayeeAssessmentComponent,
    StaffIncomeComponent,
    TaxIncomeComponent,
    // payee
    PayeeBillsComponent,
    PayeeCreateAssessmentComponent,
    PayeeGenerateBillComponent,
    PayeeManageEditComponent,
    PayeeManageEmployeeComponent,
    PayeeManualInputComponent,
    PayeeOnboardComponent,
    PayeeOverviewComponent,
    PayeeViewComponent,
    PayeeBusinessListComponent,
    PayeeOverview2Component,
    PayeeOverview3Component,
    // tax payer
    TaxPayerComponent,
    TransBillsComponent,
    BusinessComponent,
    PayeeComponent,
    Individual2Component,
    TaxPayerCreateComponent,
    // dashboard
    DashboardComponent,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    // admin console
    AdminConsoleComponent,
    AdminDepartmentComponent, 
    AdminLocationComponent,
    AddUserComponent,
    EditUserComponent,
    ViewUserComponent,
    ListUserDepLocComponent,
    // mda
    MdaOnboardComponent,
    MdaTableComponent,
    // direct assessment
    OnboardComponent,
    DirectSelfComponent,
    DirectBojComponent,
    DirectHistoryComponent,
    DirectBillComponent,
    DirectHistoryEditComponent,
    DirectHistoryViewEditComponent,
    // vehicle
    VehicleOnboardComponent,
    VehicleBillsComponent,
    VehicleRenewViewComponent,
    VehicleRenewEditComponent,
    VehicleRegComponent,
    // profile
    ProfileViewComponent, 
    ProfileEditComponent, 
    ProfileChangePasswordComponent,
    // Pipe component
    DateAgoPipe,
  ],
  imports: [
    CommonModule,
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
    MatBadgeModule,
    MatChipsModule,
    LoadingBarModule,
    QrCodeModule,
    // CdkMenuModule
  ],
})
export class AppPublicSidenavModule {}
