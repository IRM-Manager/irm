import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import {
  AppState, selectAllDepartment, selectAllGroup, selectAllLocation, selectAllProfile
} from 'src/app/reducers/index';
import {
  AddDepartment, AddGroup, AddLocation, AddProfile
} from '../../actions/irm.action';
import { Department, Group, Locationn, Profile } from '../models/irm';
//
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ProfileServiceService } from '../profile-component/service/profile-service.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-app-public-sidenav-list',
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
      this.router.url == '/dashboard/dashboard4/taxpayer/payee/access' ||
      this.router.url ==
        '/dashboard/dashboard4/taxpayer/payee/access/staff-input' ||
      this.router.url == '/dashboard/dashboard4/taxpayer/payee/bills'
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
      this.router.url == '/dashboard/dashboard22/taxpayer/non/business' ||
      this.router.url == '/dashboard/dashboard22/taxpayer/ind' ||
      this.router.url == '/dashboard/dashboard22/taxpayer/non'
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
      this.router.url == '/dashboard/dashboard5/location'
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
      this.router.url == '/dashboard/dashboard5/direct/history' ||
      this.router.url == '/dashboard/dashboard5/direct/history/view' ||
      this.router.url == '/dashboard/dashboard5/direct/history/view-edit'
    ) {
      this.type = 'direct';
    }
    // vehicle
    else if (
      this.router.url == '/dashboard/dashboard5/vehicle' ||
      this.router.url == '/dashboard/dashboard5/vehicle/bills' ||
      this.router.url == '/dashboard/dashboard5/vehicle/renew' ||
      this.router.url == '/dashboard/dashboard5/vehicle/renew/edit' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg'
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
    // home
    else {
      this.type = 'home';
    }
  }

  PayeeBack() {
    // this.shared.PayeesendClickEvent('');
    // this.shared.PayeesenddataEvent('');
    // this.shared.setMessage(undefined);
    // this.shared.setMessage2(undefined);
    // this.shared.setMessage3(undefined);
    // this.shared.sendPayeeHeaderButtonClickEvent(false);
    // this.router.navigate(['/dashboard']);
    this._location.back();
  }

  PayeeBusinessBack() {
    // this.shared.PayeesenddataEvent('');
    // this.shared.setMessage(undefined);
    // this.shared.setMessage2(undefined);
    // this.shared.setMessage3(undefined);
    // this.shared.sendPayeeHeaderButtonClickEvent(false);
    // this.router.navigate(['/dashboard3/taxpayer/payee']);
    this.router.navigate(['/preview']);
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  getJwtToken(): any {
    return this.authService.getJwtToken();
  }

  AddProfile() {
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

  AddGroup() {
    this.httpService.getAuthSingle(BaseUrl.list_group).subscribe(
      (data: any) => {
        this.store.dispatch(new AddGroup([{ id: 1, data: data.data }]));
      },
      (err) => {}
    );
  }

  AddDepartment() {
    this.httpService.getAuthSingle(BaseUrl.list_department).subscribe(
      (data: any) => {
        this.store.dispatch(new AddDepartment([{ id: 1, data: data.results }]));
      },
      (err) => {}
    );
  }

  AddLocation() {
    this.httpService.getAuthSingle(BaseUrl.list_location).subscribe(
      (data: any) => {
        this.store.dispatch(new AddLocation([{ id: 1, data: data.results }]));
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.AddProfile();
    this.AddGroup();
    this.AddDepartment();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
    this.shared.sendHeaderClickEvent();
  };
}
