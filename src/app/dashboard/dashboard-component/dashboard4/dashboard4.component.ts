import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Person2 } from '../../shared/form';

@Component({
  selector: 'app-dashboard4',
  standalone: true,
  imports: [CommonModule, MatIconModule, DataTablesModule, MatToolbarModule],
  templateUrl: './dashboard4.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard4.component.scss'],
})
export class Dashboard4Component implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private authService: AuthService) {}

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.datas = Person2;
    this.dtTrigger.next;
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
