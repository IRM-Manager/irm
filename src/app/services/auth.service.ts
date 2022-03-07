import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, retry, tap } from 'rxjs/operators';
import { BaseUrl } from 'src/environments/environment';
import { Tokens } from 'src/app/public-layout/shared/form';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ToggleNavService } from '../public-layout/sharedService/toggle-nav.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() public sidenavToggle2 = new EventEmitter();
  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();  

  constructor(public shared: ToggleNavService, private http: HttpClient,
    private snackBar: MatSnackBar) {
     }

    login(user: { username: string, password: string }): Observable<boolean> {
      return this.http.post<any>(BaseUrl.api + 'user/api/v1/token/', user)
        .pipe(
          tap((tokens: any) => {this.storeTokens(tokens)}),
            mapTo(true),
            catchError((error: any) => {
                if(error.status === 401) {
                  this.snackBar.open("wrong username or password", "", {
                  duration: 5000,
                  panelClass: "error"
                });
                }
                else if(error.status === 0) {
                  this.snackBar.open('error', "", {
                    duration: 5000,
                    panelClass: "error"
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
  

    // refresh token 
    refreshToken() {
      const httpOptions = {
        headers: {
          'Authorization': `Bearer ${this.getRefreshToken()}`
        }
      };
      return this.http.post<any>(BaseUrl.api + 'user/api/v1/token/refresh/', '', httpOptions)
      .pipe(
        tap((tokens: any) => {this.storeJwtToken(tokens.access);}),
          mapTo(true),
          catchError((error: any) => {
            return of(false);
          })
        );
    }

  
  // checkToken() {
  //   // const decodedToken = this.helper.decodeToken(this.getJwtToken());
  //   // const expirationDate = this.helper.getTokenExpirationDate(this.getJwtToken());
  //   const isExpired = this.helper.isTokenExpired(this.getJwtToken());
  //   const RisExpired = this.helper.isTokenExpired(this.getRefreshToken());
  //   if( (RisExpired === false) && (isExpired === true) ) {
  //     this.refreshToken();
  //   }
  //   else if( (RisExpired === true) && (isExpired === true) ) {
      
  //     this.logout();
  //     this.router.navigate(['']);
  //     this.shared.sendClickEvent();
  //     this.snackBar.open("Please Login", "x", {
  //       duration: 5000,
  //       panelClass: "warning"
  //     });
  //     this.removeTokens();
  //     this.dialog.closeAll(); 
  //   }

  // }
  
    getJwtToken(): any {
      return localStorage.getItem(this.JWT_TOKEN);
    }

    // logout user
    public logout() {
      this.removeTokens();
    }

    getRefreshToken(): any {
      return localStorage.getItem(this.REFRESH_TOKEN);
    }
  
    private storeJwtToken(jwt: string) {
      localStorage.setItem(this.JWT_TOKEN, jwt);
    }
  
    private storeTokens(tokens: Tokens) {
      localStorage.setItem(this.JWT_TOKEN, tokens.access);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
    }
  
    private removeTokens() {
      localStorage.removeItem(this.JWT_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
    }

}
