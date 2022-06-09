import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Person2 } from '../../../shared/form';

@Component({
  selector: 'app-payee-overview3',
  templateUrl: './payee-overview3.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-overview3.component.scss']
})
export class PayeeOverview3Component implements OnInit {

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private authService: AuthService,) { }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.datas = Person2;
    this.dtTrigger.next
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
