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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() public sidenavToggle2 = new EventEmitter();
  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();
  private base_url = BaseUrl.server;

  constructor(
    public shared: ToggleNavService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(this.base_url + BaseUrl.login, user).pipe(
      tap((tokens: any) => {
        this.storeTokens(tokens);
      }),
      mapTo(true),
      catchError((error: any) => {
        if (error.status === 401) {
          this.snackBar.open('wrong username or password', '', {
            duration: 5000,
            panelClass: 'error',
          });
        } else if (error.status === 0) {
          this.snackBar.open('Error', '', {
            duration: 5000,
            panelClass: 'error',
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
      this.snackBar.open('Please Relogin', '', {
        duration: 5000,
        panelClass: 'error',
      });
      this.router.navigate(['']);
    } else if (!RisExpired && !isExpired) {
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
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
