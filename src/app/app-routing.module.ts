import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/IsloggedIn.guards';
import { LoginGuard } from './guards/login.guards';
import { SignupGuard } from './guards/signup.guards';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component'
import { DefaultLayoutComponent } from './default-layout/default-layout.component'
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';


const routes: Routes = [{
  path: '', component: DefaultLayoutComponent, children: [
    {path: '', loadChildren: () => import('./public-layout/home/home.module').then(m => m.HomeModule),
      canActivate: [LoginGuard],
      // canLoad: [SignupGuard],
    },
    {path: 'home', loadChildren: () => import('./public-layout/home/home.module').then(m => m.HomeModule),
      canActivate: [LoginGuard],
      // canLoad: [SignupGuard],
    },
    {path: 'dashboard', loadChildren: () => import('./public-layout/dashboard/dashboard.module').then(m => m.DashboardModule),
      canLoad: [IsLoggedInGuard]
    },
     
  ]},
  {
    path: '', component: DashboardLayoutComponent, children: [
      {path: 'admin', loadChildren: () => import('./private-layout/private-home/private-home.module').then(m => m.PrivateHomeModule) ,
      // canActivate: [DashboardGuard],
      // canLoad: [IsLoggedInGuard] 
    
      },
      {path: 'admin/home', loadChildren: () => import('./private-layout/private-home/private-home.module').then(m => m.PrivateHomeModule) ,
      // canLoad: [IsLoggedInGuard] 
    
      },
    
]
},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NetworkAwarePreloadingStrategyService2Service})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
