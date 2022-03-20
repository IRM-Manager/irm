import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Person2 } from '../shared/form';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-staff-income',
  templateUrl: './staff-income.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./staff-income.component.scss']
})
export class StaffIncomeComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  type: Boolean = false;
  type2: Boolean = false;
  viewMode = 'file';
  clickEventSubscription?: Subscription;

  constructor(private dialog: MatDialog, private authService: AuthService,
    public shared: ToggleNavService) {
      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
        this.datas = data.data;
        this.type = true;
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
      type: 'verify',
      data: null
    }
    this.shared.PayeesendClickEvent(data);
  }

  Continue() {
    const data = {
      type: 'tax-income',
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
