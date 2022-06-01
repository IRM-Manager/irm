import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { Profile } from '../../models/irm';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AddProfile } from '../../actions/irm.action';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-app-public-sidenav-list',
  templateUrl: './app-public-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./app-public-sidenav-list.component.scss'],
})
export class AppPublicSidenavListComponent implements OnInit {
  @Output() public publicsidenavClose = new EventEmitter();

  clickEventSubscription?: Subscription;
  hide = false;
  panelOpenState = false;
  profile: any;
  type: any;

  stateProfile: Observable<Profile[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private store: Store<AppState>,
    public shared: ToggleNavService
  ) {
    this.clickEventSubscription = this.shared
      .getHeaderSideClickEvent()
      .subscribe((data: any) => {
        this.hide = false;
      });

    this.authService.checkExpired();
    this.stateProfile = store.select(selectAllProfile);

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute();
      }
    });
  }

  currentRoute() {
    if (
      this.router.url == '/dashboard3/taxpayer/payee' ||
      this.router.url == '/dashboard3/taxpayer/payee/lists' ||
      this.router.url == '/dashboard3/taxpayer/payee/staff-income' ||
      this.router.url == '/dashboard3/taxpayer/payee/assessment' ||
      this.router.url == '/dashboard4/taxpayer/payee/access' ||
      this.router.url == '/dashboard4/taxpayer/payee/access/staff-input' ||
      this.router.url == '/dashboard4/taxpayer/payee/bills'
    ) {
      this.type = 'payee';
    } else if (this.router.url == '/dashboard') {
      this.type = 'dashboard';
    } else if (
      this.router.url == '/dashboard2/taxpayer' ||
      this.router.url == '/dashboard2/taxpayer/non' ||
      this.router.url == '/dashboard2/taxpayer/ind' ||
      this.router.url == '/dashboard22/taxpayer' ||
      this.router.url == '/dashboard22/taxpayer/ind/individual' ||
      this.router.url == '/dashboard22/taxpayer/non/business' ||
      this.router.url == '/dashboard22/taxpayer/ind' ||
      this.router.url == '/dashboard22/taxpayer/non'
    ) {
      this.type = 'tax_payer';
    } else {
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
    this.router.navigate(['/preview']);
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
        this.httpService.getProfile().subscribe(
          (data: any) => {
            this.store.dispatch(new AddProfile([{ id: 1, data: data }]));
            this.profile = data;
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

  ngOnInit(): void {
    this.AddProfile();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
    this.shared.sendHeaderClickEvent();
    this.hide = true;
  };
}
