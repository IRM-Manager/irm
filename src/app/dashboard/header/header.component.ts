import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  AppState,
  selectAllComPayer,
  selectAllIndPayer,
  selectAllProfile,
  selectAllStates,
  selectAllYear,
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import {
  AddComPayer,
  AddIndPayer,
  AddProfile,
  AddStates,
  AddYear,
} from '../../actions/irm.action';
import { DialogComponent } from '../dialog/dialog.component';
import { ComPayer, IndPayer, Profile, States, Year } from '../models/irm';
import { ProfileServiceService } from '../profile-component/service/profile-service.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public publicsidenavToggle = new EventEmitter();

  left_text1!: string;
  left_text2!: string;
  type: any;
  profile: any;
  hide = true;
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
    private store: Store<AppState>,
    private adminService: ProfileServiceService
  ) {
    this.clickEventSubscription = this.shared
      .getHeaderClickEvent()
      .subscribe((data: any) => {
        this.hide = false;
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

  // get width of hearder when resizing
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 960) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  currentRoute() {
    // Tax Payer
    if (this.router.url == '/dashboard/dashboard2/taxpayer') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard/dashboard2/taxpayer/non') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard/dashboard2/taxpayer/ind') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard/dashboard2/taxpayer/business') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard/dashboard22/taxpayer') {
      this.type = 'tax';
      this.left_text1 = 'Taxpayer';
      this.left_text2 = 'View Tax Payer Details';
    } else if (
      this.router.url == '/dashboard/dashboard22/taxpayer/ind/individual'
    ) {
      this.type = 'tax';
      this.left_text1 = 'Individual Taxpayer Registration Form';
      this.left_text2 = 'Please fill in the information';
    } else if (
      this.router.url == '/dashboard/dashboard22/taxpayer/non/business'
    ) {
      this.type = 'reg_tax';
      this.left_text1 = 'Non - Individual Taxpayer Registration Form';
      this.left_text2 = 'Please fill in the information';
    }
    // Payee
    else if (
      this.router.url == '/dashboard/dashboard3/taxpayer/payee' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/staff-income' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manage-edit' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manual-input' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/lists-view' ||
      this.router.url == '/dashboard/dashboard4/taxpayer/payee/access' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manual/add' ||
      this.router.url ==
        '/dashboard/dashboard4/taxpayer/payee/access/staff-input' ||
      this.router.url == '/dashboard/dashboard4/taxpayer/payee/bills'
    ) {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = '';
    } else if (
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/lists'
    ) {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Concluded Assessment';
    } else if (
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/business-list'
    ) {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Check all the list of registered member';
    } else if (this.router.url == '/dashboard/dashboard3/taxpayer/payee/bill') {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Generated Bills';
    } else if (
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manage'
    ) {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Manage Staffs Employees';
    } else if (
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/assessment'
    ) {
      this.type = 'payee';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Create New assessment for PAYE';
    } else if (
      this.router.url == '/dashboard/dashboard4/taxpayer/payee/overview'
    ) {
      this.type = 'tax_dashboard2';
      this.left_text1 = 'Pay-As-You-Earn (PAYE)';
      this.left_text2 = 'Dashboard';
    }
    // MDA
    else if (
      this.router.url == '/dashboard/dashboard3/mda' ||
      this.router.url == '/dashboard/dashboard3/mda/bill' ||
      this.router.url == '/dashboard/dashboard3/mda/generate'
    ) {
      this.type = 'mda';
      this.left_text1 = 'MDA Collection';
    }
    // Dashboard
    else if (this.router.url == '/dashboard/dashboard') {
      this.type = 'tax_dashboard';
      this.left_text1 = 'Dashboard';
      this.left_text2 = 'Dashboard';
    }
    // Admin Console
    else if (
      this.router.url == '/dashboard/dashboard5/admin-console' ||
      this.router.url == '/dashboard/dashboard5/dep-loc'
    ) {
      this.type = 'mda';
      this.left_text1 = 'Admin Console';
      this.left_text2 = '';
    } else if (this.router.url == '/dashboard/dashboard5/add-user') {
      this.type = 'mda';
      this.left_text1 = 'Admin Console';
      this.left_text2 = 'Add New User';
    } else if (this.router.url == '/dashboard/dashboard5/edit-user') {
      this.type = 'mda';
      this.left_text1 = 'Admin Console';
      this.left_text2 = 'Edit User Details';
    } else if (this.router.url == '/dashboard/dashboard5/view-user') {
      this.type = 'mda';
      this.left_text1 = 'Admin Console';
      this.left_text2 = 'User Details';
    } else if (this.router.url == '/dashboard/dashboard5/department') {
      this.type = 'mda';
      this.left_text1 = 'Admin Console';
      this.left_text2 = 'Departments';
    } else if (this.router.url == '/dashboard/dashboard5/location') {
      this.type = 'mda';
      this.left_text1 = 'Admin Console';
      this.left_text2 = 'Offices';
    }
    // Direct accessment
    else if (
      this.router.url == '/dashboard/dashboard5/direct' ||
      this.router.url == '/dashboard/dashboard5/direct/self' ||
      this.router.url == '/dashboard/dashboard5/direct/bill' ||
      this.router.url == '/dashboard/dashboard5/direct/boj' ||
      this.router.url == '/dashboard/dashboard5/direct/history/view' ||
      this.router.url == '/dashboard/dashboard5/direct/boj/create' ||
      this.router.url == '/dashboard/dashboard5/direct/self/create'
    ) {
      this.type = 'payee';
      this.left_text1 = 'Direct Assessment';
    }
    // vehicle
    else if (
      this.router.url == '/dashboard/dashboard5/vehicle' ||
      this.router.url == '/dashboard/dashboard5/vehicle/bills' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg-vehicle' ||
      this.router.url == '/dashboard/dashboard5/vehicle/document' ||
      this.router.url == '/dashboard/dashboard5/vehicle/change-owner' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg-plate' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg-plate/create' ||
      this.router.url == '/dashboard/dashboard5/vehicle/offence' ||
      this.router.url == '/dashboard/dashboard5/vehicle/approval' ||
      this.router.url == '/dashboard/dashboard5/vehicle/approval/review' ||
      this.router.url == '/dashboard/dashboard5/vehicle/new-reg' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg' ||
      this.router.url == '/dashboard/dashboard5/vehicle/new-plate' ||
      this.router.url == '/dashboard/dashboard5/vehicle/reg-vehicle/assessment'
    ) {
      this.type = 'mda';
      this.left_text1 = 'Vehicle Licensing';
    }
    // Witholding
    else if (
      this.router.url == '/dashboard/dashboard3/witholding' ||
      this.router.url == '/dashboard/dashboard3/witholding/apply' ||
      this.router.url == '/dashboard/dashboard3/witholding/assessment' ||
      this.router.url == '/dashboard/dashboard3/witholding/view'
    ) {
      this.type = 'mda';
      this.left_text1 = 'Withholding Tax';
    }
    // stamp
    else if (
      this.router.url == '/dashboard/dashboard3/stamp' ||
      this.router.url == '/dashboard/dashboard3/stamp/apply' ||
      this.router.url == '/dashboard/dashboard3/stamp/assessment' ||
      this.router.url == '/dashboard/dashboard3/stamp/view'
    ) {
      this.type = 'mda';
      this.left_text1 = 'Stamp Duties';
    }
    // account
    else if (
      this.router.url == '/dashboard/dashboard5/account' ||
      this.router.url == '/dashboard/dashboard5/account/edit' ||
      this.router.url == '/dashboard/dashboard5/account-password'
    ) {
      this.type = 'mda';
      this.left_text1 = 'Account Settings';
    } else {
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
        this.httpService.getAuthSingle(BaseUrl.get_profile).subscribe(
          (data: any) => {
            this.adminService.setAdminMessage(data.data);
            this.adminService.sendClickEvent();
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
    this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
      (data: any) => {
        this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
      },
      (err) => {}
    );
  }

  addIndividualPayer() {
    this.httpService.getAuthSingle(BaseUrl.list_ind_payer).subscribe(
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
    this.httpService.getAuthSingle(BaseUrl.list_com_payer).subscribe(
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
    this.httpService.getSingleNoAuth(BaseUrl.list_state).subscribe(
      (data: any) => {
        this.store.dispatch(new AddStates([{ id: 1, data: data.results }]));
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
    // this.shared.sendHeaderSideClickEvent();
    this.hide = true;
  };

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(DialogComponent, {
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
