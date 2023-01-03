import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { BaseUrl } from 'src/environments/environment';
import { AddProfile } from '../../../actions/irm.action';
import { Profile } from '../../../dashboard/models/irm';
import { HttpService } from '../../../services/http.service';
import { ProfileServiceService } from '../service/profile-service.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './profile-view.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  stateProfile: Observable<Profile[]>;
  profile: any;

  constructor(
    private service: ProfileServiceService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.authService.checkExpired();
    this.stateProfile = store.select(selectAllProfile);
  }

  addProfile() {
    this.stateProfile.forEach((e) => {
      if (e.length > 0) {
        this.profile = e[0].data;
      } else {
        this.httpService.getAuthSingle(BaseUrl.get_profile).subscribe(
          (data: any) => {
            this.service.setAdminMessage(data.data);
            this.service.sendClickEvent();
            this.store.dispatch(new AddProfile([{ id: 1, data: data.data }]));
            this.profile = data.data;
          },
          () => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.addProfile();
  }

  sendMessage() {
    this.service.setAdminMessage(this.profile);
    this.router.navigate(['/dashboard/dashboard5/account/edit']);
  }
}
