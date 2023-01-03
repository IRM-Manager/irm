import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-profilling-configure-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    DataTablesModule,
  ],
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
