import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from 'src/app/dashboard/shared/form';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../dashboard/sharedService/toggle-nav.service';
//
import { Store } from '@ngrx/store';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { RemoveProfile } from '../actions/irm.action';
import { Profile } from '../dashboard/models/irm';
import { ProfileServiceService } from '../dashboard/profile-component/service/profile-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() public sidenavToggle2 = new EventEmitter();
  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();
  private base_url = BaseUrl.server;

  stateProfile: Observable<Profile[]>;

  constructor(
    public shared: ToggleNavService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>,
    private adminService: ProfileServiceService
  ) {
    this.stateProfile = store.select(selectAllProfile);
  }

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(this.base_url + BaseUrl.login, user).pipe(
      tap((tokens: any) => {
        this.logout();
        this.storeTokens(tokens);
      }),
      mapTo(true),
      catchError((error: any) => {
        if (error.status === 401) {
          this.snackBar.open(error.error.detail, '', {
            duration: 5000,
            panelClass: 'error',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else if (error.status === 0) {
          this.snackBar.open('Error', '', {
            duration: 5000,
            panelClass: 'error',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        return of(false);
      })
    );
  }

  // check if user is login
  isLoggedIn() {
    return !!this.getJwtToken();
  }

  checkExpired() {
    const isExpired = this.helper.isTokenExpired(this.getJwtToken());
    const RisExpired = this.helper.isTokenExpired(this.getRefreshToken());
    if (!RisExpired && isExpired) {
      this.refreshToken();
    } else if (RisExpired) {
      this.logout();
      // this.snackBar.open('Please Relogin', '', {
      //   duration: 5000,
      //   panelClass: 'error',
      //   horizontalPosition: 'center',
      //   verticalPosition: 'top',
      // });
      this.router.navigate(['']);
    } else if (!RisExpired && !isExpired) {
      this.refreshToken();
    } else {
      this.logout();
      this.router.navigate(['']);
    }
  }

  // refresh token
  refreshToken() {
    const data = {
      refresh: this.getRefreshToken(),
    };
    return this.http.post<any>(this.base_url + BaseUrl.refresh, data).subscribe(
      (tokens: any) => {
        console.log(tokens);
        this.storeJwtToken(tokens.access);
        return true;
      },
      (error: any) => {
        return false;
      }
    );
  }

  getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  // logout user
  public logout() {
    this.adminService.setAdminMessage(undefined);
    this.adminService.sendClickEvent();
    this.store.dispatch(new RemoveProfile([{ id: 1, data: [] }]));
    this.removeTokens();
    this.router.navigate(['/']);
  }

  getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  public storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
    // const isExpired = this.helper.decodeToken(this.getJwtToken());
    // const RisExpired = this.helper.decodeToken(this.getRefreshToken());
    // console.log(isExpired)
    // console.log(RisExpired)
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
