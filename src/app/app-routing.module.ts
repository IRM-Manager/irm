import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/IsloggedIn.guards';
import { LoginGuard } from './guards/login.guards';
import { SignupGuard } from './guards/signup.guards';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component'
import { DefaultLayoutComponent } from './default-layout/default-layout.component'
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {path: '', component: HomeComponent, 
      canActivate: [LoginGuard],
  },

  {
  // {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  //     canActivate: [LoginGuard],
  //     // canLoad: [SignupGuard],
  //   },
  //   {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  //     canActivate: [LoginGuard],
  //     // canLoad: [SignupGuard],
  //   },

  path: '', component: DefaultLayoutComponent, children: [
    {path: 'dashboard', loadChildren: () => import('./public-layout/dashboard/dashboard.module').then(m => m.DashboardModule),
      canLoad: [IsLoggedInGuard]
    },
    { path: 'dashboard/taxpayer', loadChildren: () => import('./public-layout/individual/individual.module').then(m => m.IndividualModule),
        canLoad: [IsLoggedInGuard]
    },

    { path: 'dashboard/taxpayer/individual', loadChildren: () => import('./public-layout/individual2/individual2.module').then(m => m.Individual2Module),
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
