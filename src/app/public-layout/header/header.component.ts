import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { Profile, States, Year } from '../../models/irm';
import { AppState, selectAllProfile, selectAllStates, selectAllYear } from 'src/app/reducers/index';
import { AddProfile, RemoveProfile, AddStates, RemoveStates, AddYear, RemoveYear } from '../../actions/irm.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Output() public publicsidenavToggle = new EventEmitter();

  left_text1!: string;
  left_text2!: string;
  type: any;
  profile: any;

  stateProfile: Observable<Profile[]>;
  stateStates: Observable<States[]>;
  stateYear: Observable<Year[]>;

  constructor(private dialog: MatDialog, private shared: ToggleNavService, private authService: AuthService,
    private router: Router, private snackBar: MatSnackBar, private httpService: HttpService,
    private store: Store<AppState>) {

      this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { 
          this.currentRoute();
        }
      });

      this.stateProfile = store.select(selectAllProfile);
      this.stateStates = store.select(selectAllStates);
      this.stateYear = store.select(selectAllYear);

  }

  currentRoute() {
    if (this.router.url == "/dashboard2/taxpayer") {
      this.type = "tax";
      this.left_text1 = "Taxpayer Registration";
      this.left_text2 = "Check all the list of registered member";
    }
    else if (this.router.url == "/dashboard2/taxpayer/ind/individual"){
      this.type = "tax";
      this.left_text1 = "Individual Taxpayer Registration Form";
      this.left_text2 = "Please fill in the information";
    }
    else if (this.router.url == "/dashboard2/taxpayer/non/business"){
      this.type = "reg_tax";
      this.left_text1 = "Non - Individual Taxpayer Registration Form";
      this.left_text2 = "Please fill in the information";
    }
    else if (this.router.url == "/dashboard3/taxpayer/payee" || this.router.url == "/dashboard3/taxpayer/payee/staff-income"){
      this.type = "payee";
      this.left_text1 = "Pay-As-You-Earn (PAYE)";
      this.left_text2 = "Please fill in the information";
    }
    else if (this.router.url == "/dashboard"){
      this.type = "tax";
      this.left_text1 = "Dashboard";
      this.left_text2 = "Dashboard";
    }
    else {
      this.type = "tax";
      this.left_text1 = "Taxpayer Registration";
      this.left_text2 = "Check all the list of registered member";
    }
  }


  getJwtToken(): any {
    return this.authService.getJwtToken();
  }

  AddProfile() {
    this.stateProfile.forEach(e => {
      if(e.length > 0 ) {
        this.profile = e[0].data.data;
        console.log(e[0].data.data)
      }
      else {
        this.httpService.getProfile(this.getJwtToken()).subscribe(
          (data:any) => {
            if(data.responsecode == "01"){
            }else{
              this.store.dispatch(new AddProfile([{id: 1, data: data}]));
              this.profile = data.data;
            }
          },
          err => {
            this.authService.refreshToken();
          }
        )
      }
    }) 
  }


  AddYear() {
      this.httpService.year().subscribe(
        (data:any) => {
          if(data.responsecode == "01"){
          }else{
            this.store.dispatch(new AddYear([{id: 1, data: data}]));
          }
        },
        err => {
        }
      ) 
  }


  AddState() {
    this.httpService.state('state', 1).subscribe(
      (data:any) => {
        if(data.responsecode == "01"){
        }else{
          this.store.dispatch(new AddStates([{id: 1, data: data}]));
        }
      },
      err => {
      }
    ) 
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


  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavToggle.emit();
  }  

  ngOnInit(): void {
    this.AddProfile();
    this.AddState();
    this.AddYear();
  }


}
