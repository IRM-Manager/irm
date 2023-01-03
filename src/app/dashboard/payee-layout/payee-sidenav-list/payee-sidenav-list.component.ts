import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
// state management
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/index';
import { HttpService } from 'src/app/services/http.service';
import { AddYear } from '../../../actions/irm.action';

@Component({
  selector: 'app-payee-sidenav-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './payee-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-sidenav-list.component.scss'],
})
export class PayeeSidenavListComponent implements OnInit {
  payee_type: any;

  constructor(
    private router: Router,
    public shared: ToggleNavService,
    private _location: Location,
    private httpService: HttpService,
    private store: Store<AppState>
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
      this.router.url == '/dashboard/dashboard3/taxpayer/payee/manual/add' ||
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

  payeeBack() {
    this._location.back();
  }

  addYear() {
    this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
      (data: any) => {
        console.log(data);
        this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
      },
      (err) => {}
    );
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav();
  }

  ngOnInit(): void {
    this.addYear();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.shared.sendHeaderClickEvent();
  };
}
