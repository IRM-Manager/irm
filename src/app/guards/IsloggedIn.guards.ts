import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate, CanLoad {

  private helper = new JwtHelperService();  

  constructor(private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar) {
  }

  canActivate() {
    return this.canLoad();
  }


  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open("Please Login", "", {
        duration: 5000,
        panelClass: "error"
      });
      this.router.navigate(['']);
    }
    // else {
    //   const isExpired = this.helper.isTokenExpired(this.authService.getJwtToken());
    //   const RisExpired = this.helper.isTokenExpired(this.authService.getRefreshToken());
    //   if( (RisExpired === false) && (isExpired === true) ) {
    //     this.authService.refreshToken();
    //   }
    //   else if( (RisExpired === true) && (isExpired === true) ) {
    //     this.authService.logout();
    //   }
    // }
    return this.authService.isLoggedIn();
  }


}
