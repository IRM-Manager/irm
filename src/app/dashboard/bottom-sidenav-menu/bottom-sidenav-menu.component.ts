import {
  Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
// state management
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
  templateUrl: './bottom-sidenav-menu.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./bottom-sidenav-menu.component.scss'],
})
export class BottomSidenavMenuComponent implements OnInit {
  profile: any;
  stateProfile: Observable<Profile[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private store: Store<AppState>
  ) {
    this.stateProfile = store.select(selectAllProfile);
  }

  AddProfile() {
    this.stateProfile.forEach((e) => {
      if (e.length > 0) {
        this.profile = e[0].data;
        console.log('profile_state', e[0].data);
      } else {
        this.httpService.getAuthSingle(BaseUrl.get_profile).subscribe(
          (data: any) => {
            this.store.dispatch(new AddProfile([{ id: 1, data: data.data }]));
            this.profile = data.data;
            console.log('http_profile', data.data);
          },
          (err: any) => {
            this.authService.checkExpired();
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
