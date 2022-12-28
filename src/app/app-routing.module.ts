import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { IsLoggedInGuard } from './guards/IsloggedIn.guards';
import { LoginGuard } from './guards/login.guards';
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/home/home.component').then((m) => m.HomeComponent),
    canLoad: [LoginGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../app/signup/signup.component').then((m) => m.SignupComponent),
    canLoad: [LoginGuard],
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('../app/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
    canLoad: [LoginGuard],
  },
  {
    path: 'preview',
    loadComponent: () =>
      import('../app/preview/preview.component').then(
        (m) => m.PreviewComponent
      ),
    canLoad: [IsLoggedInGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/app-public-sidenav/app-public-sidenav.module').then(
        (m) => m.AppPublicSidenavModule
      ),
    canLoad: [IsLoggedInGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/app-private-sidenav/app-private-sidenav.module').then(
        (m) => m.AppPrivateSidenavModule
      ),
    // canActivate: [DashboardGuard],
    // canLoad: [IsLoggedInGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetworkAwarePreloadingStrategyService2Service,
    }),
    LoadingBarRouterModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
