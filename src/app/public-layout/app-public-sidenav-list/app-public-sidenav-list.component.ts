import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-app-public-sidenav-list',
  templateUrl: './app-public-sidenav-list.component.html',
  styleUrls: ['./app-public-sidenav-list.component.scss']
})
export class AppPublicSidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  clickEventSubscription?: Subscription;
  
  constructor(private shared: ToggleNavService,
    private router: Router) { 

  }

  routeRedirect() {
    this.onSidenavClose()
  }


  ngOnInit(): void {
  }


  logout() {
    this.shared.sendClickEvent();
  }


  public onSidenavClose = () => {
    this.sidenavClose.emit();
  } 

  
}
