import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { Profile } from '../../models/irm';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AddProfile} from '../../actions/irm.action';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-app-public-sidenav-list',
  templateUrl: './app-public-sidenav-list.component.html',
  styleUrls: ['./app-public-sidenav-list.component.scss']
})
export class AppPublicSidenavListComponent implements OnInit {
  
  @Output() public publicsidenavClose = new EventEmitter();

  clickEventSubscription?: Subscription;
  hide = false;
  panelOpenState = false;
  profile: any;
  
  stateProfile: Observable<Profile[]>;

  constructor(private router: Router, private authService: AuthService,
    private httpService: HttpService, private store: Store<AppState>, public shared: ToggleNavService) { 

      this.clickEventSubscription = this.shared.getHeaderSideClickEvent().subscribe((data: any) => {
        this.hide = false;
      })

      this.authService.checkExpired()
      this.stateProfile = store.select(selectAllProfile);
  }

  routeRedirect() {
    this.onPublicHeaderToggleSidenav()
  }


  getJwtToken(): any {
    return this.authService.getJwtToken();
  }


  AddProfile() {
    this.stateProfile.forEach(e => {
      if(e.length > 0 ) {
        this.profile = e[0].data.data;
        console.log("profile_state",e[0].data.data)
      }
      else {
        this.httpService.getProfile(this.getJwtToken()).subscribe(
          (data:any) => {
            if(data.responsecode == "01"){
            }else{
              this.store.dispatch(new AddProfile([{id: 1, data: data}]));
              this.profile = data.data;
              console.log("http_profile", data.data)
            }
          },
          (err: any) => {
            this.authService.refreshToken();
          }
        )
      }
    }) 
  }


  limit(title: any, limit = 11) {
    if(title === undefined) {
      return ''
    }else {
    const newTitle: any = [];
    if(title.length > limit) {
      title.split('').reduce((acc: any, cur: any) => {
        if(acc + cur.length <= limit) {
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
    this.authService.logout()
    this.router.navigate([''])
  }


  ngOnInit(): void {
    this.AddProfile();
  }
  

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
    this.shared.sendHeaderClickEvent();
    this.hide = true;
  } 

  
}
