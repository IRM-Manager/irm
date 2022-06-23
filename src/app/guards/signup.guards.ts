import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignupGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _location: Location
  ) {
    // this.authService.checkExpired();
  }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (this.authService.isLoggedIn()) {
      this.snackBar.open('Unauthorised', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      // this._location.back();
      this.router.navigate(['/preview']);
    }
    return !this.authService.isLoggedIn();
  }
}
