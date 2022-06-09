import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _location: Location
  ) {
    this.authService.checkExpired();
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.snackBar.open('Already Logged In', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/preview']);
      // this._location.back();
    }
    return !this.authService.isLoggedIn();
  }
}
