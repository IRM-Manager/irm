import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/IsloggedIn.guards';
import { LoginGuard } from './guards/login.guards';
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';
import { SignupGuard } from './guards/signup.guards';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SignupComponent } from './signup/signup.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'register', component: SignupComponent, canActivate: [SignupGuard] },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    canActivate: [LoginGuard],
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
