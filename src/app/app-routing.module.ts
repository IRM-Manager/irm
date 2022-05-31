import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/IsloggedIn.guards';
import { LoginGuard } from './guards/login.guards';
import { SignupGuard } from './guards/signup.guards';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'preview', component: PreviewComponent, canLoad: [IsLoggedInGuard] },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./public-layout/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard2/taxpayer/:id',
        loadChildren: () =>
          import('./public-layout/tax-payer/tax-payer.module').then(
            (m) => m.IndividualModule
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard2/taxpayer',
        loadChildren: () =>
          import('./public-layout/tax-payer/tax-payer.module').then(
            (m) => m.IndividualModule
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard22/taxpayer',
        loadChildren: () =>
          import('./public-layout/tax-payer-layout/tax-payer-create/tax-payer-create.module'
          ).then((m) => m.TaxPayerCreateModule),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard22/taxpayer/ind',
        loadChildren: () =>
          import(
            './public-layout/tax-payer-layout/tax-payer-create/tax-payer-create.module'
          ).then((m) => m.TaxPayerCreateModule),
      },
      {
        path: 'dashboard22/taxpayer/non',
        loadChildren: () =>
          import(
            './public-layout/tax-payer-layout/tax-payer-create/tax-payer-create.module'
          ).then((m) => m.TaxPayerCreateModule),
      },
      {
        path: 'dashboard22/taxpayer/ind/individual',
        loadChildren: () =>
          import(
            './public-layout/tax-payer-layout/individual2/individual2.module'
          ).then((m) => m.Individual2Module),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard22/taxpayer/non/business',
        loadChildren: () =>
          import(
            './public-layout/tax-payer-layout/business/business.module'
          ).then((m) => m.BusinessModule),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/payee',
        loadChildren: () =>
          import('./public-layout/payee/payee.module').then(
            (m) => m.PayeeModule
          ),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard3/taxpayer/mda',
        loadChildren: () =>
          import('./public-layout/mda/mda.module').then((m) => m.MDAModule),
        canLoad: [IsLoggedInGuard],
      },
      {
        path: 'dashboard4/taxpayer/payee/access/:id',
        loadChildren: () =>
          import(
            './public-layout/payee-assessment/payee-assessment.module'
          ).then((m) => m.PayeeAssessmentModule),
      },
      {
        path: 'dashboard4/taxpayer/payee/access',
        loadChildren: () =>
          import(
            './public-layout/payee-assessment/payee-assessment.module'
          ).then((m) => m.PayeeAssessmentModule),
      },
      {
        path: 'dashboard4/taxpayer/payee/bills',
        loadChildren: () =>
          import('./public-layout/trans-bills/trans-bills.module').then(
            (m) => m.TransBillsModule
          ),
      },
      {
        path: 'dashboard4/taxpayer/payee/overview',
        loadChildren: () =>
          import('./public-layout/payee-overview/payee-overview.module').then(
            (m) => m.PayeeOverviewModule
          ),
      },
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./private-layout/private-home/private-home.module').then(
            (m) => m.PrivateHomeModule
          ),
        // canActivate: [DashboardGuard],
        // canLoad: [IsLoggedInGuard]
      },
      {
        path: 'admin/home',
        loadChildren: () =>
          import('./private-layout/private-home/private-home.module').then(
            (m) => m.PrivateHomeModule
          ),
        // canLoad: [IsLoggedInGuard]
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetworkAwarePreloadingStrategyService2Service,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
