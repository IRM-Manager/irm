import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-direct-sidenav-list',
  templateUrl: './direct-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./direct-sidenav-list.component.scss'],
})
export class DirectSidenavListComponent implements OnInit {
  constructor(
    private router: Router,
    public shared: ToggleNavService,
    private _location: Location
  ) {}

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
