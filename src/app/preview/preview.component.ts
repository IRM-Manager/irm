import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { Observable } from 'rxjs';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { BaseUrl } from 'src/environments/environment';
import { AddProfile } from '../actions/irm.action';
import { Profile } from '../dashboard/models/irm';
import { ProfileServiceService } from '../dashboard/profile-component/service/profile-service.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    LoadingBarRouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './preview.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./preview.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  stateProfile: Observable<Profile[]>;
  profile: any;
  left_text1!: string;
  left_text2!: string;
  loading = false;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private httpService: HttpService,
    private adminService: ProfileServiceService
  ) {
    this.authService.checkExpired();
    //
    this.stateProfile = store.select(selectAllProfile);
  }

  redirectToDepartment(type: string) {}

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

  AddProfile() {
    this.loading = true;
    this.stateProfile.forEach((e) => {
      if (e.length > 0) {
        this.profile = e[0].data;
        this.loading = false;
      } else {
        this.httpService.getAuthSingle(BaseUrl.get_profile).subscribe(
          (data: any) => {
            this.adminService.setAdminMessage(data.data);
            this.adminService.sendClickEvent();
            this.store.dispatch(new AddProfile([{ id: 1, data: data.data }]));
            this.profile = data.data;
            this.loading = false;
          },
          (err) => {
            this.authService.checkExpired();
            this.loading = false;
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.AddProfile();
    // let card = <HTMLElement>document.querySelector('.container')
    // for (let i in card) {
    //   card.style.opacity = '0.5';
    // }
  }

  logout() {
    this.authService.logout();
  }
}
