import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { Dashboard2Component } from '../dashboard2/dashboard2.component';
import { Dashboard3Component } from '../dashboard3/dashboard3.component';
import { Dashboard4Component } from '../dashboard4/dashboard4.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
  ],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  hide = true;

  constructor(
    private authService: AuthService,
    private shared: ToggleNavService
  ) {}

  ngOnInit(): void {
    this.authService.checkExpired();
  }
}
