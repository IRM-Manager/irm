import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-payee-sidenav-list',
  templateUrl: './payee-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-sidenav-list.component.scss'],
})
export class PayeeSidenavListComponent implements OnInit {
  payee_type: any;

  constructor(
    private router: Router,
    public shared: ToggleNavService,
    private _location: Location
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.payeeRoute();
      }
    });
  }

  payeeRoute() {
    if (
      this.router.url == '/dashboard/dashboard3/taxpayer/payee' ||
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/lists' ||
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
      this.payee_type = 'payee';
    } else {
      this.payee_type = 'business';
    }
  }

  PayeeBack() {
    this._location.back();
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  ngOnInit(): void {}

  public onPublicHeaderToggleSidenav = () => {
    this.shared.sendHeaderClickEvent();
  };
}
