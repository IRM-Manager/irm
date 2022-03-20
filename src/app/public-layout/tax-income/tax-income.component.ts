import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Person2 } from '../shared/form';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-tax-income',
  templateUrl: './tax-income.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./tax-income.component.scss']
})
export class TaxIncomeComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  previous_data: any;
  clickEventSubscription?: Subscription;

  constructor(private dialog: MatDialog, private authService: AuthService,
    public shared: ToggleNavService) {
      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
        if (data.type == 'staff-income') {
          this.previous_data = data.data;
        }
      })
    }

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

  back() {
    const data = {
      type: 'staff-income',
      data: this.previous_data
    }
    this.shared.PayeesendClickEvent(data);
  }

  Continue() {
    const data = {
      type: 'bill',
      data: this.datas
    }
    this.shared.PayeesendClickEvent(data);
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
