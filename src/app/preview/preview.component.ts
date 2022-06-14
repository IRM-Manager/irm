import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { RemoveProfile } from '../actions/irm.action';
import { Profile } from '../dashboard/models/irm';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  stateProfile: Observable<Profile[]>;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    this.authService.checkExpired();
    this.stateProfile = store.select(selectAllProfile);
  }

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(new RemoveProfile([{ id: 1, data: [] }]));
    this.authService.logout();
    this.snackBar.open('Logout successful', '', {
      duration: 5000,
      panelClass: 'success',
    });
  }
}
