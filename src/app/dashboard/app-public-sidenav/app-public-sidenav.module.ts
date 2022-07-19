import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppPublicSidenavRoutingModule } from './app-public-sidenav-routing.module';
// modules
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { DataTablesModule } from 'angular-datatables';
import { ChartModule } from 'angular-highcharts';
import { QrCodeModule } from 'ng-qrcode';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PublicSharedModuleModule } from '../public-shared-module/public-shared-module.module';

// import { CdkMenuModule } from '@angular/cdk/menu';
// components
import { AddUserComponent } from '../admin-console-component/add-user/add-user.component';
import { AdminConsoleComponent } from '../admin-console-component/admin-console/admin-console.component';
import { AdminDepartmentComponent } from '../admin-console-component/admin-department/admin-department.component';
import { AdminLocationComponent } from '../admin-console-component/admin-location/admin-location.component';
import { EditUserComponent } from '../admin-console-component/edit-user/edit-user.component';
import { ListUserDepLocComponent } from '../admin-console-component/list-user-dep-loc/list-user-dep-loc.component';
import { ViewUserComponent } from '../admin-console-component/view-user/view-user.component';
import { DashboardComponent } from '../dashboard-component/dashboard/dashboard.component';
import { Dashboard2Component } from '../dashboard-component/dashboard2/dashboard2.component';
import { Dashboard3Component } from '../dashboard-component/dashboard3/dashboard3.component';
import { Dashboard4Component } from '../dashboard-component/dashboard4/dashboard4.component';
import { BojCreateComponent } from '../direct-access-component/boj-create/boj-create.component';
import { DirectBillComponent } from '../direct-access-component/direct-bill/direct-bill.component';
import { DirectBojComponent } from '../direct-access-component/direct-boj/direct-boj.component';
import { DirectDialogComponent } from '../direct-access-component/direct-dialog/direct-dialog.component';
import { DirectHistoryEditComponent } from '../direct-access-component/direct-history-edit/direct-history-edit.component';
import { DirectSelfComponent } from '../direct-access-component/direct-self/direct-self.component';
import { OnboardComponent } from '../direct-access-component/onboard/onboard.component';
import { SelfCreateComponent } from '../direct-access-component/self-create/self-create.component';
import { MdaOnboardComponent } from '../mda-component/mda-onboard/mda-onboard.component';
import { MdaTableComponent } from '../mda-component/mda-table/mda-table.component';
import { MDAComponent } from '../mda-component/mda/mda.component';
import { PayeeAssessmentComponent } from '../payee-layout/payee-assessment/payee-assessment.component';
import { PayeeBillsComponent } from '../payee-layout/payee-bills/payee-bills.component';
import { PayeeBusinessListComponent } from '../payee-layout/payee-business-list/payee-business-list.component';
import { PayeeCreateAssessmentComponent } from '../payee-layout/payee-create-assessment/payee-create-assessment.component';
import { PayeeDialogComponent } from '../payee-layout/payee-dialog/payee-dialog.component';
import { PayeeGenerateBillComponent } from '../payee-layout/payee-generate-bill/payee-generate-bill.component';
import { PayeeManageEditComponent } from '../payee-layout/payee-manage-edit/payee-manage-edit.component';
import { PayeeManageEmployeeComponent } from '../payee-layout/payee-manage-employee/payee-manage-employee.component';
import { PayeeManualInputComponent } from '../payee-layout/payee-manual-input/payee-manual-input.component';
import { PayeeOnboardComponent } from '../payee-layout/payee-onboard/payee-onboard.component';
import { PayeeOverview2Component } from '../payee-layout/Payee-overview-component/payee-overview2/payee-overview2.component';
import { PayeeOverview3Component } from '../payee-layout/Payee-overview-component/payee-overview3/payee-overview3.component';
import { PayeeOverviewComponent } from '../payee-layout/payee-overview/payee-overview.component';
import { PayeeViewComponent } from '../payee-layout/payee-view/payee-view.component';
import { PayeeComponent } from '../payee-layout/payee/payee.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { ProfileChangePasswordComponent } from '../profile-component/profile-change-password/profile-change-password.component';
import { ProfileEditComponent } from '../profile-component/profile-edit/profile-edit.component';
import { ProfileViewComponent } from '../profile-component/profile-view/profile-view.component';
import { StaffIncomeComponent } from '../staff-income/staff-income.component';
import { TaxIncomeComponent } from '../tax-income/tax-income.component';
import { BusinessComponent } from '../tax-payer-layout/business/business.component';
import { Individual2Component } from '../tax-payer-layout/individual2/individual2.component';
import { TaxPayerCreateComponent } from '../tax-payer-layout/tax-payer-create/tax-payer-create.component';
import { TaxPayerComponent } from '../tax-payer-layout/tax-payer/tax-payer.component';
import { TransBillsComponent } from '../trans-bills/trans-bills.component';
import { VehicleBillsComponent } from '../vehicle-component/vehicle-bills/vehicle-bills.component';
import { VehicleDialogComponent } from '../vehicle-component/vehicle-dialog/vehicle-dialog.component';
import { VehicleOnboardComponent } from '../vehicle-component/vehicle-onboard/vehicle-onboard.component';
import { VehicleRegComponent } from '../vehicle-component/vehicle-reg-component/vehicle-reg/vehicle-reg.component';
import { VehicleRenewEditComponent } from '../vehicle-component/vehicle-renew-edit/vehicle-renew-edit.component';
import { VehicleRenewViewComponent } from '../vehicle-component/vehicle-renew-view/vehicle-renew-view.component';
import { AppPublicSidenavComponent } from './app-public-sidenav.component';
import { RegisteredVehicleComponent } from '../vehicle-component/vehicle-reg-component/registered-vehicle/registered-vehicle.component';
import { VehicleDocumentComponent } from '../vehicle-component/vehicle-reg-component/vehicle-document/vehicle-document.component';
import { ChangeOwnerComponent } from '../vehicle-component/change-owner/change-owner.component';
import { PlateComponent } from '../vehicle-component/plate/plate.component';
import { VehicleRegPlateComponent } from '../vehicle-component/vehicle-reg-plate/vehicle-reg-plate.component';
import { VehicleOffenceComponent } from '../vehicle-component/vehicle-offence/vehicle-offence.component';
import { VehicleApprovalComponent } from '../vehicle-component/vehicle-approval/vehicle-approval.component';
import { VehicleApprovalReviewComponent } from '../vehicle-component/vehicle-approval-review/vehicle-approval-review.component';

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
    DirectBillComponent,
    DirectHistoryEditComponent,
    SelfCreateComponent,
    BojCreateComponent,
    DirectDialogComponent,
    // vehicle
    VehicleOnboardComponent,
    VehicleBillsComponent,
    VehicleRenewViewComponent,
    VehicleRenewEditComponent,
    VehicleRegComponent,
    RegisteredVehicleComponent,
    VehicleDocumentComponent,
    ChangeOwnerComponent,
    PlateComponent,
    VehicleRegPlateComponent,
    VehicleOffenceComponent,
    VehicleDialogComponent,
    VehicleApprovalComponent,
    VehicleApprovalReviewComponent,
    // profile
    ProfileViewComponent,
    ProfileEditComponent,
    ProfileChangePasswordComponent,
    //
    PayeeDialogComponent,
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
    NgxDocViewerModule,
    // CdkMenuModule
  ],
})
export class AppPublicSidenavModule {}
