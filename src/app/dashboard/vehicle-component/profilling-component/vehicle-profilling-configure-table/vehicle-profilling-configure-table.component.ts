import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-profilling-configure-table',
  templateUrl: './vehicle-profilling-configure-table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vehicle-profilling-configure-table.component.scss'],
})
export class VehicleProfillingConfigureTableComponent
  implements OnDestroy, OnInit
{
  search: string = '';
  stat: any;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  formErrors: any = {};
  validationMessages: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private service: VehicleServiceService
  ) {
    this.authService.checkExpired();
    //
    const data: any = this.service.getProfileMessage();
    if (data) {
      this.stat = data?.data;
    } else {
      this.router.navigate(['/dashboard/dashboard5/vehicle/profilling']);
    }
    //
  }

  modelChange(search: any) {
    const data = this.searchData?.filter((data: any) => {
      return (
        data?.name.toLowerCase().includes(search.toLowerCase()) ||
        data?.amount == search ||
        data?.duration == search
      );
    });
    this.datas = data;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };
    this.datas = this.stat?.data;
    this.searchData = this.stat?.data;
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
