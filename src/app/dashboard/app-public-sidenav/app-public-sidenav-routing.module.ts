import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard-component/dashboard/dashboard.component';
import { MDAComponent } from '../mda-component/mda/mda.component';
import { PayeeAssessmentComponent } from '../payee-layout/payee-assessment/payee-assessment.component';
import { PayeeBusinessListComponent } from '../payee-layout/payee-business-list/payee-business-list.component';
import { PayeeCreateAssessmentComponent } from '../payee-layout/payee-create-assessment/payee-create-assessment.component';
import { PayeeGenerateBillComponent } from '../payee-layout/payee-generate-bill/payee-generate-bill.component';
import { PayeeManageEditComponent } from '../payee-layout/payee-manage-edit/payee-manage-edit.component';
import { PayeeManageEmployeeComponent } from '../payee-layout/payee-manage-employee/payee-manage-employee.component';
import { PayeeOnboardComponent } from '../payee-layout/payee-onboard/payee-onboard.component';
import { PayeeOverviewComponent } from '../payee-layout/payee-overview/payee-overview.component';
import { PayeeViewComponent } from '../payee-layout/payee-view/payee-view.component';
import { PayeeComponent } from '../payee-layout/payee/payee.component';
import { BusinessComponent } from '../tax-payer-layout/business/business.component';
import { Individual2Component } from '../tax-payer-layout/individual2/individual2.component';
import { TaxPayerCreateComponent } from '../tax-payer-layout/tax-payer-create/tax-payer-create.component';
import { TaxPayerComponent } from '../tax-payer-layout/tax-payer/tax-payer.component';
import { TransBillsComponent } from '../trans-bills/trans-bills.component';
import { AppPublicSidenavComponent } from './app-public-sidenav.component';
import { AdminConsoleComponent } from '../admin-console-component/admin-console/admin-console.component';
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

const routes: Routes = [
  {
    path: '',
    component: AppPublicSidenavComponent,
    children: [
      // DASHBOARD
      { path: '', component: DashboardComponent },
      // MDA
      { path: 'dashboard3/mda/generate', component: MDAComponent },
      { path: 'dashboard3/mda', component: MdaOnboardComponent },
      { path: 'dashboard3/mda/bill', component: MdaTableComponent },
      // PAYEE
      {
        path: 'dashboard3/taxpayer/payee/lists',
        component: PayeeComponent,
      },
      {
        path: 'dashboard4/taxpayer/payee/access',
        component: PayeeAssessmentComponent,
      },
      {
        path: 'dashboard4/taxpayer/payee/access/:id',
        component: PayeeAssessmentComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee/business-list',
        component: PayeeBusinessListComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee/assessment',
        component: PayeeCreateAssessmentComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee/bill',
        component: PayeeGenerateBillComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee/manage-edit',
        component: PayeeManageEditComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee/manage',
        component: PayeeManageEmployeeComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee/manual-input',
        component: PayeeManageEmployeeComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee',
        component: PayeeOnboardComponent,
      },
      {
        path: 'dashboard3/taxpayer/payee/lists-view',
        component: PayeeViewComponent,
      },
      {
        path: 'dashboard4/taxpayer/payee/overview',
        component: PayeeOverviewComponent,
      },
      // TAX PAYER
      {
        path: 'dashboard2/taxpayer/:id',
        component: TaxPayerComponent,
      },
      { path: 'dashboard2/taxpayer', component: TaxPayerComponent },
      {
        path: 'dashboard22/taxpayer/non/business',
        component: BusinessComponent,
      },
      {
        path: 'dashboard22/taxpayer/ind/individual',
        component: Individual2Component,
      },
      {
        path: 'dashboard22/taxpayer',
        component: TaxPayerCreateComponent,
      },
      {
        path: 'dashboard22/taxpayer/non',
        component: TaxPayerCreateComponent,
      },
      {
        path: 'dashboard22/taxpayer/ind',
        component: TaxPayerCreateComponent,
      },
      {
        path: 'dashboard4/taxpayer/payee/bills',
        component: TransBillsComponent,
      },
      // ADMIN CONSOLE
      {
        path: 'dashboard5/admin-console',
        component: AdminConsoleComponent,
      },
      {
        path: 'dashboard5/add-user',
        component: AddUserComponent,
      },
      {
        path: 'dashboard5/edit-user',
        component: EditUserComponent,
      },
      {
        path: 'dashboard5/view-user',
        component: ViewUserComponent,
      },
      // DIRECT ACCESSMENT
      {
        path: 'dashboard5/direct',
        component: OnboardComponent,
      },
      {
        path: 'dashboard5/direct/self',
        component: DirectSelfComponent,
      },
      {
        path: 'dashboard5/direct/boj',
        component: DirectBojComponent,
      },
      {
        path: 'dashboard5/direct/history',
        component: DirectHistoryComponent,
      },
      {
        path: 'dashboard5/direct/bill',
        component: DirectBillComponent,
      },
      {
        path: 'dashboard5/direct/history/view',
        component: DirectHistoryEditComponent,
      },
      {
        path: 'dashboard5/direct/history/view-edit',
        component: DirectHistoryViewEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPublicSidenavRoutingModule {}
