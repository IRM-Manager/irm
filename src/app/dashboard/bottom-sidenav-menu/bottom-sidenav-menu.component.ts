import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddProfile } from '../../actions/irm.action';
import { Profile } from '../models/irm';

@Component({
  selector: 'app-bottom-sidenav-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './bottom-sidenav-menu.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./bottom-sidenav-menu.component.scss'],
})
export class BottomSidenavMenuComponent implements OnInit {
  profile: any;
  stateProfile: Observable<Profile[]>;
  loading = false;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private store: Store<AppState>
  ) {
    this.stateProfile = store.select(selectAllProfile);
  }

  AddProfile() {
    this.loading = true;
    this.stateProfile.forEach((e) => {
      if (e.length > 0) {
        this.profile = e[0].data;
        this.loading = false;
        console.log('profile_state', e[0].data);
      } else {
        this.httpService.getAuthSingle(BaseUrl.get_profile).subscribe(
          (data: any) => {
            this.store.dispatch(new AddProfile([{ id: 1, data: data.data }]));
            this.profile = data.data;
            this.loading = false;
            console.log('http_profile', data.data);
          },
          () => {
            this.authService.checkExpired();
            this.loading = false;
          }
        );
      }
    });
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
  }

  ngOnInit(): void {
    this.AddProfile();
  }
}
