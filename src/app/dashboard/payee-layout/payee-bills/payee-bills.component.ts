import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { Person3 } from '../../shared/form';

@Component({
  selector: 'app-payee-bills',
  templateUrl: './payee-bills.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-bills.component.scss']
})
export class PayeeBillsComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router,
    private authService: AuthService, private http: HttpClient, private dialog: MatDialog) {
      this.authService.checkExpired();
  }


  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 12
    };
    this.datas = Person3;
    // this.http.get<any[]>('data/data.json')
    //   .subscribe((data: any) => {
    //     this.persons = (data as any).data;
    //     // Calling the DT trigger to manually render the table
    //     this.dtTrigger.next
    //   });
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();

  }


  OpenDialog(data: any, type: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
