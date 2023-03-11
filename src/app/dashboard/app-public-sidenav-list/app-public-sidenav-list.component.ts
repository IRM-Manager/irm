import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import {
  AppState,
  selectAllDepartment,
  selectAllGroup,
  selectAllLocation,
  selectAllOccupation,
  selectAllProfile,
} from 'src/app/reducers/index';
import {
  AddDepartment,
  AddLocation,
  AddOccupation,
  AddProfile,
} from '../../actions/irm.action';
import {
  Department,
  Group,
  Locationn,
  Occupation,
  Profile,
} from '../models/irm';
//
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AdminSidenavListComponent } from '../admin-console-component/admin-sidenav-list/admin-sidenav-list.component';
import { BottomSidenavMenuComponent } from '../bottom-sidenav-menu/bottom-sidenav-menu.component';
import { DashboardSidenavListComponent } from '../dashboard-component/dashboard-sidenav-list/dashboard-sidenav-list.component';
import { DirectSidenavListComponent } from '../direct-access-component/direct-sidenav-list/direct-sidenav-list.component';
import { MdaSidenavListComponent } from '../mda-component/mda-sidenav-list/mda-sidenav-list.component';
import { PayeeSidenavListComponent } from '../payee-layout/payee-sidenav-list/payee-sidenav-list.component';
import { ProfileSidenavListComponent } from '../profile-component/profile-sidenav-list/profile-sidenav-list.component';
import { ProfileServiceService } from '../profile-component/service/profile-service.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
import { StampSideNavListComponent } from '../stamp-duties-component/stamp-side-nav-list/stamp-side-nav-list.component';
import { TaxpayerSidenavListComponent } from '../tax-payer-layout/taxpayer-sidenav-list/taxpayer-sidenav-list.component';
import { SideNavListComponent } from '../vehicle-component/side-nav-list/side-nav-list.component';
import { WitholdingSidenavListComponent } from '../withholding-tax-component/witholding-sidenav-list/witholding-sidenav-list.component';

@Component({
  selector: 'app-app-public-sidenav-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    MatExpansionModule,
    BottomSidenavMenuComponent,
    PayeeSidenavListComponent,
    DashboardSidenavListComponent,
    TaxpayerSidenavListComponent,
    AdminSidenavListComponent,
    MdaSidenavListComponent,
    DirectSidenavListComponent,
    SideNavListComponent,
    ProfileSidenavListComponent,
    WitholdingSidenavListComponent,
    StampSideNavListComponent,
  ],
  templateUrl: './app-public-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./app-public-sidenav-list.component.scss'],
})
export class AppPublicSidenavListComponent implements OnInit {
  @Output() public publicsidenavClose = new EventEmitter();
  clickEventSubscription?: Subscription;
  panelOpenState = false;
  profile: any;
  type: any;
  payee_type: any;
  stateProfile: Observable<Profile[]>;
  stateGroup: Observable<Group[]>;
  stateDepartment: Observable<Department[]>;
  stateLocation: Observable<Locationn[]>;
  stateOccupation: Observable<Occupation[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private store: Store<AppState>,
    public shared: ToggleNavService,
    private _location: Location,
    private adminService: ProfileServiceService
  ) {
    this.clickEventSubscription = this.shared
      .getHeaderSideClickEvent()
      .subscribe((data: any) => {
        this.publicsidenavClose.emit();
      });

    this.authService.checkExpired();
    // state
    this.stateProfile = store.select(selectAllProfile);
    this.stateGroup = store.select(selectAllGroup);
    this.stateDepartment = store.select(selectAllDepartment);
    this.stateLocation = store.select(selectAllLocation);
    this.stateOccupation = store.select(selectAllOccupation);
    //

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute();
      }
    });
  }

  currentRoute() {
    // payee
    if (
      this.router.url == '/dashboard/dashboard3/taxpayer/payee' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/lists' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/business-list' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/staff-income' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/assessment' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/bill' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manage' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manage-edit' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manual-input' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/lists-view' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manual/add'
    ) {
      this.type = 'payee';
    }
    // dashboard
    else if (this.router.url == '/dashboard') {
      this.type = 'dashboard';
    }
    // taxpayer
    else if (
      this.router.url == '/dashboard/dashboard2/taxpayer' ||
      this.router.url == '/dashboard/dashboard2/taxpayer/non' ||
      this.router.url == '/dashboard/dashboard2/taxpayer/ind' ||
      this.router.url == '/dashboard/dashboard22/taxpayer' ||
      this.router.url == '/dashboard/dashboard22/taxpayer/ind/individual' ||
      this.router.url == '/dashboard/dashboard22/taxpayer/non/business'
    ) {
      this.type = 'tax_payer';
    }
    // admin-console
    else if (
      this.router.url == '/dashboard/dashboard5/admin-console' ||
      this.router.url == '/dashboard/dashboard5/add-user' ||
      this.router.url == '/dashboard/dashboard5/edit-user' ||
      this.router.url == '/dashboard/dashboard5/view-user' ||
      this.router.url == '/dashboard/dashboard5/department' ||
      this.router.url == '/dashboard/dashboard5/location' ||
      this.router.url == '/dashboard/dashboard5/dep-loc'
    ) {
      this.type = 'admin-console';
    }
    // mda
    else if (
      this.router.url == '/dashboard/dashboard3/mda' ||
      this.router.url == '/dashboard/dashboard3/mda/generate' ||
      this.router.url == '/dashboard/dashboard3/mda/bill'
    ) {
      this.type = 'mda';
    }
    // direct
    else if (
      this.router.url == '/dashboard/dashboard5/direct' ||
      this.router.url == '/dashboard/dashboard5/direct/self' ||
      this.router.url == '/dashboard/dashboard5/direct/bill' ||
      this.router.url == '/dashboard/dashboard5/direct/boj' ||
      this.router.url == '/dashboard/dashboard5/direct/history/view' ||
      this.router.url == '/dashboard/dashboard5/direct/boj/create' ||
      this.router.url == '/dashboard/dashboard5/direct/self/create'
    ) {
      this.type = 'direct';
    }
    // vehicle
    else if (
      this.router.url == '/dashboard/dashboard5/vehicle' ||
      this.router.url == '/dashboard/dashboard5/vehicle/bills' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg-vehicle' ||
      this.router.url == '/dashboard/dashboard5/vehicle/document' ||
      this.router.url == '/dashboard/dashboard5/vehicle/penalty' ||
      this.router.url == '/dashboard/dashboard5/vehicle/change-owner' ||
      this.router.url == '/dashboard/dashboard5/vehicle/change-owner/details' ||
      this.router.url ==
        '/dashboard/dashboard5/vehicle/change-owner/assessment' ||
      this.router.url == '/dashboard/dashboard5/vehicle/change-owner/new-reg' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg-plate' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg-plate/create' ||
      this.router.url == '/dashboard/dashboard5/vehicle/offence' ||
      this.router.url == '/dashboard/dashboard5/vehicle/approval' ||
      this.router.url == '/dashboard/dashboard5/vehicle/approval/review' ||
      this.router.url == '/dashboard/dashboard5/vehicle/new-reg' ||
      this.router.url == '/dashboard/dashboard5/vehicle/new-plate' ||
      this.router.url ==
        '/dashboard/dashboard5/vehicle/reg-vehicle/assessment' ||
      this.router.url == '/dashboard/dashboard5/vehicle/profilling' ||
      this.router.url == '/dashboard/dashboard5/vehicle/profilling/configure' ||
      this.router.url ==
        '/dashboard/dashboard5/vehicle/profilling/configure/create'
    ) {
      this.type = 'vehicle';
    }
    // account
    else if (
      this.router.url == '/dashboard/dashboard5/account' ||
      this.router.url == '/dashboard/dashboard5/account/edit' ||
      this.router.url == '/dashboard/dashboard5/account-password'
    ) {
      this.type = 'account';
    }
    // Witholding
    else if (
      this.router.url == '/dashboard/dashboard3/witholding' ||
      this.router.url == '/dashboard/dashboard3/witholding/apply' ||
      this.router.url == '/dashboard/dashboard3/witholding/assessment' ||
      this.router.url == '/dashboard/dashboard3/witholding/view'
    ) {
      this.type = 'witholding';
    }
    // stamp duties
    else if (
      this.router.url == '/dashboard/dashboard3/stamp' ||
      this.router.url == '/dashboard/dashboard3/stamp/apply' ||
      this.router.url == '/dashboard/dashboard3/stamp/assessment' ||
      this.router.url == '/dashboard/dashboard3/stamp/view'
    ) {
      this.type = 'stamp';
    }
    // home
    else {
      this.type = 'home';
    }
  }

  payeeBack() {
    this._location.back();
  }

  payeeBusinessBack() {
    this.router.navigate(['/preview']);
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  getJwtToken(): any {
    return this.authService.getJwtToken();
  }

  addProfile() {
    this.stateProfile.forEach((e) => {
      if (e.length > 0) {
        this.profile = e[0].data;
        console.log('profile_state', e[0].data);
      } else {
        this.httpService.getAuthSingle(BaseUrl.get_profile).subscribe(
          (data: any) => {
            this.adminService.setAdminMessage(data.data);
            this.adminService.sendClickEvent();
            this.store.dispatch(new AddProfile([{ id: 1, data: data.data }]));
            this.profile = data.data;
            console.log('http_profile', data.data);
          },
          (err: any) => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  limit(title: any, limit = 11) {
    if (title === undefined) {
      return '';
    } else {
      const newTitle: any = [];
      if (title.length > limit) {
        title.split('').reduce((acc: any, cur: any) => {
          if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
          return acc + cur.length;
        }, 0);
        return `${newTitle.join('')}...`;
      }
      return title;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  // addGroup() {
  //   this.httpService
  //     .getAuthSingle(BaseUrl.list_group)
  //     .subscribe((data: any) => {
  //       this.store.dispatch(new AddGroup([{ id: 1, data: data.data }]));
  //     });
  // }

  addDepartment() {
    this.httpService
      .getAuthSingle(BaseUrl.list_department)
      .subscribe((data: any) => {
        this.store.dispatch(new AddDepartment([{ id: 1, data: data.results }]));
      });
  }

  addLocation() {
    this.httpService
      .getAuthSingle(BaseUrl.list_location)
      .subscribe((data: any) => {
        this.store.dispatch(new AddLocation([{ id: 1, data: data.results }]));
      });
  }

  addOccupation() {
    this.httpService
      .getSingleNoAuth(BaseUrl.list_occupation)
      .subscribe((data: any) => {
        this.store.dispatch(new AddOccupation([{ id: 1, data: data.results }]));
      });
  }

  ngOnInit(): void {
    this.addProfile();
    // this.addGroup();
    this.addDepartment();
    this.addOccupation();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
    this.shared.sendHeaderClickEvent();
  };
}
