import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-reg-plate',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  templateUrl: './vehicle-reg-plate.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg-plate.component.scss'],
})
export class VehicleRegPlateComponent implements OnInit {
  formData = new FormData();
  image: any;
  filename: any;
  loading = false;
  disabled = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();
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

  submit() {
    if (!this.filename) {
      this.snackBar.open('No CSV file selected!', 'x', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.loading = true;
      this.disabled = true;
      this.httpService
        .postData(BaseUrl.vehicle_upload_late, this.formData)
        .subscribe(
          (data: any) => {
            console.log(data);
            //
            this.httpService
              .postData(BaseUrl.vehicle_confirm_upload, data)
              .subscribe(
                (data: any) => {
                  console.log(data);
                  this.loading = false;
                  this.disabled = false;
                  this.snackBar.open('Plate number uploaded successfully', '', {
                    duration: 5000,
                    panelClass: 'success',
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                  });
                  this.router.navigate([
                    '/dashboard/dashboard5/vehicle/reg-plate',
                  ]);
                },
                (err) => {
                  console.log(err);
                  this.loading = false;
                  this.disabled = false;
                  this.snackBar.open(
                    err?.error?.message ||
                      err?.error?.msg ||
                      err?.error?.detail ||
                      err?.error?.status ||
                      'An Error Occured!',
                    'x',
                    {
                      duration: 5000,
                      panelClass: 'error',
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                    }
                  );
                  this.authService.checkExpired();
                }
              );
            //
          },
          (err) => {
            console.log(err);
            this.loading = false;
            this.disabled = false;
            this.snackBar.open(
              err?.error?.message ||
                err?.error?.msg ||
                err?.error?.detail ||
                err?.error?.status ||
                'An Error Occured!',
              'x',
              {
                duration: 5000,
                panelClass: 'error',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
            this.authService.checkExpired();
          }
        );
    }
  }

  ngOnInit(): void {
    console.log();
  }
}
