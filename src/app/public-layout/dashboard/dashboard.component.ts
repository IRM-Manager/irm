import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hide = true;

  constructor(private authService: AuthService, private shared: ToggleNavService,) { }

  ngOnInit(): void {
    this.authService.checkExpired();
  } 


}
