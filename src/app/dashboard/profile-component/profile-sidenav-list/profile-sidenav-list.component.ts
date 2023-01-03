import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-profile-sidenav-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './profile-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./profile-sidenav-list.component.scss'],
})
export class ProfileSidenavListComponent implements OnInit {
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
