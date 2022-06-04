import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  AppState, selectAllComPayer, selectAllIndPayer, selectAllProfile,
  selectAllStates,
  selectAllYear
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import {
  AddComPayer, AddIndPayer, AddProfile,
  AddStates,
  AddYear
} from '../../actions/irm.action';
import { ComPayer, IndPayer, Profile, States, Year } from '../../models/irm';
import { DialogComponent } from '../dialog/dialog.component';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public publicsidenavToggle = new EventEmitter();

  left_text1!: string;
  left_text2!: string;
  type: any;
  profile: any;
  hide = true;
  hidePaye = true;
  companyData: any;

  clickEventSubscription?: Subscription;

  stateProfile: Observable<Profile[]>;
  stateStates: Observable<States[]>;
  stateYear: Observable<Year[]>;
  stateIndPayer: Observable<IndPayer[]>;
  stateComPayer: Observable<ComPayer[]>;

  constructor(
    private dialog: MatDialog,
    private shared: ToggleNavService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private store: Store<AppState>
  ) {
    this.clickEventSubscription = this.shared
      .getHeaderClickEvent()
      .subscribe((data: any) => {
        this.hide = false;
      });

    this.clickEventSubscription = this.shared
      .getPayeeHeaderButtonClickEvent()
      .subscribe((data: string) => {
        if (data) {
          this.hidePaye = false;
        } else if (!data) {
          this.hidePaye = true;
        }
        this.companyData = this.shared.getMessage2();
      });

    this.authService.checkExpired();

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute();
      }
    });

    this.stateProfile = store.select(selectAllProfile);
    this.stateStates = store.select(selectAllStates);
    this.stateYear = store.select(selectAllYear);
    this.stateIndPayer = store.select(selectAllIndPayer);
    this.stateComPayer = store.select(selectAllComPayer);
  }

  currentRoute() {
    // Tax Payer
    if (this.router.url == '/dashboard2/taxpayer') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard2/taxpayer/non') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard2/taxpayer/ind') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    }
    else if (this.router.url == '/dashboard2/taxpayer/business') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard22/taxpayer') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer Registration';
      this.left_text2 = 'Register A Tax Payer';
    } else if (this.router.url == '/dashboard22/taxpayer/non') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer Registration';
      this.left_text2 = 'Register A Tax Payer';
    } else if (this.router.url == '/dashboard22/taxpayer/ind') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer Registration';
      this.left_text2 = 'Register A Tax Payer';
    } else if (this.router.url == '/dashboard22/taxpayer/ind/individual') {
      this.type = 'tax';
      this.left_text1 = 'Individual Taxpayer Registration Form';
      this.left_text2 = 'Please fill in the information';
    } else if (this.router.url == '/dashboard22/taxpayer/non/business') {
      this.type = 'reg_tax';
      this.left_text1 = 'Non - Individual Taxpayer Registration Form';
      this.left_text2 = 'Please fill in the information';
    } 
    // Payee
    else if (
      this.router.url == '/dashboard3/taxpayer/payee' ||
      this.router.url == '/dashboard3/taxpayer/payee/staff-income' ||
      this.router.url == '/dashboard3/taxpayer/payee/manage-edit' ||
      this.router.url == '/dashboard3/taxpayer/payee/lists-view' ||
      this.router.url == '/dashboard4/taxpayer/payee/access' ||
      this.router.url == '/dashboard4/taxpayer/payee/access/staff-input' ||
      this.router.url == '/dashboard4/taxpayer/payee/bills'
    ) {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = '';
    }else if (this.router.url == '/dashboard3/taxpayer/payee/lists') {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Concluded Assessment';
    }else if (this.router.url == '/dashboard3/taxpayer/payee/business-list') {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Check all the list of registered member';
    }else if (this.router.url == '/dashboard3/taxpayer/payee/bill') {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Generated Bills';
    }else if (this.router.url == '/dashboard3/taxpayer/payee/manage') {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Manage Staffs Employees';
    }else if (this.router.url == '/dashboard3/taxpayer/payee/assessment') {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Create New assessment for PAYE';
    } else if (this.router.url == '/dashboard4/taxpayer/payee/overview') {
      this.type = 'tax_dashboard2';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Dashboard';
    }
    // MDA
    else if (this.router.url == '/dashboard3/taxpayer/mda') {
      this.type = 'mda';
      this.left_text1 = 'MDA Collection';
      this.left_text2 = 'Please fill in the information';
    } 
    // Dashboard
    else if (this.router.url == '/dashboard') {
      this.type = 'tax_dashboard';
      this.left_text1 = 'Dashboard';
      this.left_text2 = 'Dashboard';
    } 
    else {
      this.type = 'tax_dashboard';
      this.left_text1 = 'Dashboard';
      this.left_text2 = 'Dashboard';
    }
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
              this.store.dispatch(new AddProfile([{ id: 1, data: data.data }]));
              this.profile = data.data;
              console.log('http_profile', data);
          },
          (err) => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  AddYear() {
    this.httpService.year().subscribe(
      (data: any) => {
        if (data.responsecode == '01') {
        } else {
          this.store.dispatch(new AddYear([{ id: 1, data: data }]));
        }
      },
      (err) => {}
    );
  }

  addIndividualPayer() {
    this.httpService.GetPayerList('individualpayers').subscribe(
      (data: any) => {
        if (data.responsecode == '01') {
        } else {
          this.store.dispatch(new AddIndPayer([{ id: 1, data: data.data }]));
        }
      },
      (err) => {}
    );
  }

  addCompanyPayer() {
    this.httpService.GetPayerList('companypayers').subscribe(
      (data: any) => {
        if (data.responsecode == '01') {
        } else {
          this.store.dispatch(new AddComPayer([{ id: 1, data: data.data }]));
        }
      },
      (err) => {}
    );
  }

  AddState() {
    this.httpService.state().subscribe(
      (data: any) => {
        if (data.responsecode == '01') {
        } else {
          this.store.dispatch(new AddStates([{ id: 1, data: data }]));
        }
      },
      (err) => {}
    );
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

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavToggle.emit();
    this.shared.sendHeaderSideClickEvent();
    this.hide = true;
  };

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  ngOnInit(): void {
    this.AddProfile();
    this.AddState();
    this.AddYear();
    this.addCompanyPayer();
    this.addIndividualPayer();
  }
}
