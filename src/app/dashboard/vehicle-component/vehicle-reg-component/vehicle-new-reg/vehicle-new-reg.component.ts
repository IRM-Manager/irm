import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-new-reg',
  templateUrl: './vehicle-new-reg.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-new-reg.component.scss'],
})
export class VehicleNewRegComponent implements OnInit {
  viewMode = 'detail';
  clickEventSubscription?: Subscription;

  constructor(
    private service: VehicleServiceService,
    private authService: AuthService
  ) {
    this.authService.checkExpired();

    this.clickEventSubscription = this.service
      .getClickEvent2()
      .subscribe((data: any) => {
        const datas: any = this.service.getRegMessage2();
        this.viewMode = datas.type;
      });
  }

  ngOnInit(): void {}
}
