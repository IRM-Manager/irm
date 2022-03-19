import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Person2 } from '../shared/form';

@Component({
  selector: 'app-tax-income',
  templateUrl: './tax-income.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./tax-income.component.scss']
})
export class TaxIncomeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private dialog: MatDialog, private authService: AuthService,) { }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.datas = Person2;
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
