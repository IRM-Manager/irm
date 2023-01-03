import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-admin-sidenav-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './admin-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./admin-sidenav-list.component.scss'],
})
export class AdminSidenavListComponent implements OnInit {
  constructor(public shared: ToggleNavService, private _location: Location) {}

  payeeBack() {
    this._location.back();
  }

  ngOnInit(): void {
    console.log();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.shared.sendHeaderClickEvent();
  };
}
