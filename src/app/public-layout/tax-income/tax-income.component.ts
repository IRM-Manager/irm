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
  previous_data: any[] = [];
  clickEventSubscription?: Subscription;
  data: any;
  data2: any;
  previousData: any;

  constructor(private dialog: MatDialog, private authService: AuthService,
    public shared: ToggleNavService) {
      this.authService.checkExpired()
      
      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
      })

      this.data = this.shared.getMessage4();
      this.data2 = this.shared.getMessage2();

    }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.datas = this.data;
    this.dtTrigger.next
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  formatMoney(n: any) {
    const tostring = n.toString()
   return (Math.round(tostring * 100) / 100).toLocaleString();
 }

  back() {
    console.log("staff previous data", this.previous_data)
    const data = {
      type: 'staff-income',
      is_true: true
    }
    this.shared.setMessage3(this.data);
    this.shared.setMessage2(this.data2);
    this.shared.PayeesendClickEvent(data);
  }

  Continue() {
    const data = {
      type: 'bill',
    }
    this.shared.setMessage(this.datas);
    this.shared.PayeesendClickEvent(data);
  }

  GetTotal() {
    return this.datas.reduce((accumulator:any, current:any) => accumulator + current.compute_taxable, 0);
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
    this.shared.setMessage3(undefined)
    this.shared.setMessage4(undefined)
  }

}
