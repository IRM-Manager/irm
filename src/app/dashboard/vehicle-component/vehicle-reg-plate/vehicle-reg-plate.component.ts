import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { VehicleServiceService } from '../service/vehicle-service.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-reg-plate',
  templateUrl: './vehicle-reg-plate.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg-plate.component.scss'],
})
export class VehicleRegPlateComponent implements OnInit {
  datas: any;
  formData = new FormData();
  image: any;
  filename: any;

  constructor(
    private service: VehicleServiceService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();
    this.datas = service.getRegMessage();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.formData = formData;
      this.filename = file.name;
      this.image = URL.createObjectURL(event.target.files[0]);
    }
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(VehicleDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
    this.router.navigate(['/dashboard/dashboard5/vehicle/reg-plate']);
  }

  ngOnInit(): void {}
}
