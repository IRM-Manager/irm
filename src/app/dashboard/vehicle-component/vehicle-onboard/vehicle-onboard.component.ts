import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-onboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    FlexLayoutModule,
  ],
  templateUrl: './vehicle-onboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-onboard.component.scss'],
})
export class VehicleOnboardComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private httpService: HttpService,
    private authService: AuthService,
    private service: VehicleServiceService
  ) {
    this.authService.checkExpired();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  plateStat() {
    this.httpService.getAuthSingle(BaseUrl.vehicle_plate_stat).subscribe(
      (data: any) => {
        console.log(data);
        this.service.setPlateStat(data.data);
      },
      (err) => {
        this.authService.checkExpired();
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.plateStat();
  }
}
