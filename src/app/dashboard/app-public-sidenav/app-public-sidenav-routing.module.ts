import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { IsLoggedInGuard } from 'src/app/guards/IsloggedIn.guards';
import { AppPublicSidenavComponent } from './app-public-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: AppPublicSidenavComponent,
    children: [
      // DASHBOARD
      {
        path: '',
        loadComponent: () =>
          import('../dashboard-component/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      // MDA
      {
        path: 'dashboard3/mda/generate',
        loadComponent: () =>
          import('../mda-component/mda/mda.component').then(
            (m) => m.MDAComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/mda',
        loadComponent: () =>
          import('../mda-component/mda-onboard/mda-onboard.component').then(
            (m) => m.MdaOnboardComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/mda/bill',
        loadComponent: () =>
          import('../mda-component/mda-table/mda-table.component').then(
            (m) => m.MdaTableComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      // PAYEE
      {
        path: 'dashboard3/taxpayer/payee/lists',
        loadComponent: () =>
          import('../payee-layout/payee/payee.component').then(
            (m) => m.PayeeComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/business-list',
        loadComponent: () =>
          import(
            '../payee-layout/payee-business-list/payee-business-list.component'
          ).then((m) => m.PayeeBusinessListComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/assessment',
        loadComponent: () =>
          import(
            '../payee-layout/payee-create-assessment/payee-create-assessment.component'
          ).then((m) => m.PayeeCreateAssessmentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/bill',
        loadComponent: () =>
          import(
            '../payee-layout/payee-generate-bill/payee-generate-bill.component'
          ).then((m) => m.PayeeGenerateBillComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/manage-edit',
        loadComponent: () =>
          import(
            '../payee-layout/payee-manage-edit/payee-manage-edit.component'
          ).then((m) => m.PayeeManageEditComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/manage',
        loadComponent: () =>
          import(
            '../payee-layout/payee-manage-employee/payee-manage-employee.component'
          ).then((m) => m.PayeeManageEmployeeComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/manual-input',
        loadComponent: () =>
          import(
            '../payee-layout/payee-manage-employee/payee-manage-employee.component'
          ).then((m) => m.PayeeManageEmployeeComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee',
        loadComponent: () =>
          import('../payee-layout/payee-onboard/payee-onboard.component').then(
            (m) => m.PayeeOnboardComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/lists-view',
        loadComponent: () =>
          import('../payee-layout/payee-view/payee-view.component').then(
            (m) => m.PayeeViewComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee/manual/add',
        loadComponent: () =>
          import(
            '../payee-layout/payee-manual-input/payee-manual-input.component'
          ).then((m) => m.PayeeManualInputComponent),
        canLoad: [IsLoggedInGuard],
      },
      // TAX PAYER
      {
        path: 'dashboard2/taxpayer/:id',
        loadComponent: () =>
          import('../tax-payer-layout/tax-payer/tax-payer.component').then(
            (m) => m.TaxPayerComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard2/taxpayer',
        loadComponent: () =>
          import('../tax-payer-layout/tax-payer/tax-payer.component').then(
            (m) => m.TaxPayerComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard22/taxpayer/non/business',
        loadComponent: () =>
          import('../tax-payer-layout/business/business.component').then(
            (m) => m.BusinessComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard22/taxpayer/ind/individual',
        loadComponent: () =>
          import('../tax-payer-layout/individual2/individual2.component').then(
            (m) => m.Individual2Component
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard22/taxpayer',
        loadComponent: () =>
          import(
            '../tax-payer-layout/tax-payer-create/tax-payer-create.component'
          ).then((m) => m.TaxPayerCreateComponent),
        canLoad: [IsLoggedInGuard],
      },
      // ADMIN CONSOLE
      {
        path: 'dashboard5/admin-console',
        loadComponent: () =>
          import(
            '../admin-console-component/admin-console/admin-console.component'
          ).then((m) => m.AdminConsoleComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/add-user',
        loadComponent: () =>
          import('../admin-console-component/add-user/add-user.component').then(
            (m) => m.AddUserComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/edit-user',
        loadComponent: () =>
          import(
            '../admin-console-component/edit-user/edit-user.component'
          ).then((m) => m.EditUserComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/view-user',
        loadComponent: () =>
          import(
            '../admin-console-component/view-user/view-user.component'
          ).then((m) => m.ViewUserComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/department',
        loadComponent: () =>
          import(
            '../admin-console-component/admin-department/admin-department.component'
          ).then((m) => m.AdminDepartmentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/location',
        loadComponent: () =>
          import(
            '../admin-console-component/admin-location/admin-location.component'
          ).then((m) => m.AdminLocationComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/dep-loc',
        loadComponent: () =>
          import(
            '../admin-console-component/list-user-dep-loc/list-user-dep-loc.component'
          ).then((m) => m.ListUserDepLocComponent),
        canLoad: [IsLoggedInGuard],
      },
      // DIRECT ACCESSMENT
      {
        path: 'dashboard5/direct',
        loadComponent: () =>
          import('../direct-access-component/onboard/onboard.component').then(
            (m) => m.OnboardComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/direct/self',
        loadComponent: () =>
          import(
            '../direct-access-component/direct-self/direct-self.component'
          ).then((m) => m.DirectSelfComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/direct/boj',
        loadComponent: () =>
          import(
            '../direct-access-component/direct-boj/direct-boj.component'
          ).then((m) => m.DirectBojComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/direct/bill',
        loadComponent: () =>
          import(
            '../direct-access-component/direct-bill/direct-bill.component'
          ).then((m) => m.DirectBillComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/direct/history/view',
        loadComponent: () =>
          import(
            '../direct-access-component/direct-history-edit/direct-history-edit.component'
          ).then((m) => m.DirectHistoryEditComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/direct/self/create',
        loadComponent: () =>
          import(
            '../direct-access-component/self-create/self-create.component'
          ).then((m) => m.SelfCreateComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/direct/boj/create',
        loadComponent: () =>
          import(
            '../direct-access-component/boj-create/boj-create.component'
          ).then((m) => m.BojCreateComponent),
        canLoad: [IsLoggedInGuard],
      },
      // Vehicle
      {
        path: 'dashboard5/vehicle',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-onboard/vehicle-onboard.component'
          ).then((m) => m.VehicleOnboardComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/bills',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-bills/vehicle-bills.component'
          ).then((m) => m.VehicleBillsComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/reg-vehicle',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-reg-component/registered-vehicle/registered-vehicle.component'
          ).then((m) => m.RegisteredVehicleComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/document',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-reg-component/vehicle-document/vehicle-document.component'
          ).then((m) => m.VehicleDocumentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/change-owner',
        loadComponent: () =>
          import(
            '../vehicle-component/change-owner-component/change-owner/change-owner.component'
          ).then((m) => m.ChangeOwnerComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/change-owner/details',
        loadComponent: () =>
          import(
            '../vehicle-component/change-owner-component/change-owner-details/change-owner-details.component'
          ).then((m) => m.ChangeOwnerDetailsComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/change-owner/new-reg',
        loadComponent: () =>
          import(
            '../vehicle-component/change-owner-component/change-owner-new-reg/change-owner-new-reg.component'
          ).then((m) => m.ChangeOwnerNewRegComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/change-owner/assessment',
        loadComponent: () =>
          import(
            '../vehicle-component/change-owner-component/change-owner-assessment/change-owner-assessment.component'
          ).then((m) => m.ChangeOwnerAssessmentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/reg-plate',
        loadComponent: () =>
          import('../vehicle-component/plate/plate.component').then(
            (m) => m.PlateComponent
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/reg-plate/create',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-reg-plate/vehicle-reg-plate.component'
          ).then((m) => m.VehicleRegPlateComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/offence',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-offence/vehicle-offence.component'
          ).then((m) => m.VehicleOffenceComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/approval',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-approval/vehicle-approval.component'
          ).then((m) => m.VehicleApprovalComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/approval/review',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-approval-review/vehicle-approval-review.component'
          ).then((m) => m.VehicleApprovalReviewComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/new-reg',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-reg-component/vehicle-new-reg/vehicle-new-reg.component'
          ).then((m) => m.VehicleNewRegComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/new-plate',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-customer-plate/vehicle-customer-plate.component'
          ).then((m) => m.VehicleCustomerPlateComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/reg-vehicle/assessment',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-reg-component/vehicle-reg-assessment/vehicle-reg-assessment.component'
          ).then((m) => m.VehicleRegAssessmentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/profilling',
        loadComponent: () =>
          import(
            '../vehicle-component/profilling-component/vehicle-profilling-table/vehicle-profilling-table.component'
          ).then((m) => m.VehicleProfillingTableComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/profilling/configure',
        loadComponent: () =>
          import(
            '../vehicle-component/profilling-component/vehicle-profilling-configure-table/vehicle-profilling-configure-table.component'
          ).then((m) => m.VehicleProfillingConfigureTableComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/profilling/configure/create',
        loadComponent: () =>
          import(
            '../vehicle-component/profilling-component/vehicle-profilling-configure-add/vehicle-profilling-configure-add.component'
          ).then((m) => m.VehicleProfillingConfigureAddComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/vehicle/penalty',
        loadComponent: () =>
          import(
            '../vehicle-component/vehicle-penalty/vehicle-penalty.component'
          ).then((m) => m.VehiclePenaltyComponent),
        canLoad: [IsLoggedInGuard],
      },
      // Account
      {
        path: 'dashboard5/account',
        loadComponent: () =>
          import(
            '../profile-component/profile-view/profile-view.component'
          ).then((m) => m.ProfileViewComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/account/edit',
        loadComponent: () =>
          import(
            '../profile-component/profile-edit/profile-edit.component'
          ).then((m) => m.ProfileEditComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard5/account-password',
        loadComponent: () =>
          import(
            '../profile-component/profile-change-password/profile-change-password.component'
          ).then((m) => m.ProfileChangePasswordComponent),
        canLoad: [IsLoggedInGuard],
      },
      // Witholding Tax
      {
        path: 'dashboard3/witholding',
        loadComponent: () =>
          import(
            '../withholding-tax-component/witholding-table-component/witholding-table-component.component'
          ).then((m) => m.WitholdingTableComponentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/witholding/apply',
        loadComponent: () =>
          import(
            '../withholding-tax-component/witholding-apply/witholding-apply.component'
          ).then((m) => m.WitholdingApplyComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/witholding/assessment',
        loadComponent: () =>
          import(
            '../withholding-tax-component/witholding-generate-assessment/witholding-generate-assessment.component'
          ).then((m) => m.WitholdingGenerateAssessmentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/witholding/view',
        loadComponent: () =>
          import(
            '../withholding-tax-component/witholding-view/witholding-view.component'
          ).then((m) => m.WitholdingViewComponent),
        canLoad: [IsLoggedInGuard],
      },
      // stamp duties
      {
        path: 'dashboard3/stamp',
        loadComponent: () =>
          import(
            '../stamp-duties-component/stamp-duties-table/stamp-duties-table.component'
          ).then((m) => m.StampDutiesTableComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/stamp/apply',
        loadComponent: () =>
          import(
            '../stamp-duties-component/stamp-duties-apply/stamp-duties-apply.component'
          ).then((m) => m.StampDutiesApplyComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/stamp/assessment',
        loadComponent: () =>
          import(
            '../stamp-duties-component/stamp-duties-assessment/stamp-duties-assessment.component'
          ).then((m) => m.StampDutiesAssessmentComponent),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/stamp/view',
        loadComponent: () =>
          import(
            '../stamp-duties-component/stamp-duties-view/stamp-duties-view.component'
          ).then((m) => m.StampDutiesViewComponent),
        canLoad: [IsLoggedInGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LoadingBarRouterModule],
  exports: [RouterModule],
})
export class AppPublicSidenavRoutingModule {}
