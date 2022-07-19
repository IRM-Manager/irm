import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-reg-plate',
  templateUrl: './vehicle-reg-plate.component.html',
  styleUrls: ['./vehicle-reg-plate.component.scss'],
})
export class VehicleRegPlateComponent implements OnInit {
  datas: any;

  constructor(
    private service: VehicleServiceService,
    private authService: AuthService
  ) {
    this.authService.checkExpired();
    this.datas = service.getRegMessage();
  }

  ngOnInit(): void {}
}
