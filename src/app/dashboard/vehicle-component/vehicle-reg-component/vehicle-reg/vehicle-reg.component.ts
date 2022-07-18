import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-reg',
  templateUrl: './vehicle-reg.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-reg.component.scss'],
})
export class VehicleRegComponent implements OnInit {
  viewMode = 'assessment';
  clickEventSubscription?: Subscription;

  constructor(
    private service: VehicleServiceService,
    private authService: AuthService
  ) {
    this.authService.checkExpired();

    this.clickEventSubscription = this.service
      .getClickEvent()
      .subscribe((data: any) => {
        const datas: any = this.service.getRegMessage();
        this.viewMode = datas.type;
      });
  }

  ngOnInit(): void {}
}
