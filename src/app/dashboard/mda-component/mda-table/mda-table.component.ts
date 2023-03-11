import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { MdaDialogComponent } from '../mda-dialog/mda-dialog.component';

@Component({
  selector: 'app-mda-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DataTablesModule,
    FormsModule,
    MatMenuModule,
    PaginatorModule,
  ],
  templateUrl: './mda-table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./mda-table.component.scss'],
})
export class MdaTableComponent implements OnDestroy, OnInit {
  search: string = '';
  from: string = '';
  to: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  clickEventSubscription?: Subscription;
  isLoading = false;
  gen_loading: any[] = [];
  dtOptions: DataTables.Settings = {};
  datas2: any;
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  formErrors: any = {};
  validationMessages: any = {};
  totalRecords = 0;
  current_page = 50;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();
  }

  formatDate(data: any) {
    var d = new Date(data),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  modelChange(search: any) {
    const data = this.searchData?.filter((data: any) => {
      return (
        data.assessment?.assess_code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        data.payer?.state_tin.toLowerCase().includes(search.toLowerCase()) ||
        data.payer?.taxpayer_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        data.bill_code.toLowerCase().includes(search.toLowerCase()) ||
        data.assessment?.assess_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        this.formatDate(data?.assessment?.assessment_date).includes(
          search.toLowerCase()
        )
      );
    });
    this.datas = data;
  }

  renderTable(event?: any) {
    this.isLoading = true;
    var d = new Date();
    const to = this.formatDate(new Date());
    console.log(to);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };

    const get_current_page = event?.first + 50;
    this.current_page = get_current_page;

    this.httpService
      .getAuthSingle(
        BaseUrl.mda_bills +
          `sdt=${this.formatDate(d.setDate(d.getDate() - 1))}&edt=${to}&page=${
            get_current_page / 50 || 1
          }`
      )
      .subscribe(
        (data: any) => {
          this.datas = data?.results;
          this.searchData = data?.results;
          this.totalRecords = data?.count;
          this.isLoading = false;
          console.log(data);
        },
        () => {
          this.isLoading = false;
          this.authService.checkExpired();
        }
      );
  }

  reload() {
    this.is_reload = true;
    var d = new Date();
    const to = this.formatDate(new Date());
    this.httpService
      .getAuthSingle(
        BaseUrl.mda_bills +
          `sdt=${
            this.from || this.formatDate(d.setDate(d.getDate() - 1))
          }&edt=${this.to || to}&page=${this.current_page / 50}`
      )
      .subscribe(
        (data: any) => {
          this.datas = data?.results;
          this.searchData = data?.results;
          this.totalRecords = data?.count;
          this.is_reload = false;
          this.isLoading = false;
          this.snackBar.open('Loaded', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          console.log(data);
        },
        () => {
          this.is_reload = false;
          this.authService.checkExpired();
        }
      );
  }

  fromChange(search: any) {
    this.from = search;
    this.reload();
    console.log(this.from);
  }

  toChange(search: any) {
    this.to = search;
    console.log(this.to);
    this.reload();
  }

  // delete bill
  deleteBill(data2: any) {
    this.gen_loading.push(data2.id);
    this.httpService
      .deleteData(BaseUrl.mda_delete_bill, data2.id + '/')
      .subscribe(
        (data: any) => {
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(data);
          const data_index = this.datas.findIndex((object) => {
            return object.id === data2.id;
          });
          this.datas.splice(data_index, 1);
          this.snackBar.open('Bill Successfully deleted!', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        (err) => {
          this.authService.checkExpired();
          const index = this.gen_loading.indexOf(data2.id);
          if (index > -1) {
            this.gen_loading.splice(index, 1);
          }
          console.log(err);
          this.snackBar.open(
            err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              'An Error Occured!',
            '',
            {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialog.open(MdaDialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
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
