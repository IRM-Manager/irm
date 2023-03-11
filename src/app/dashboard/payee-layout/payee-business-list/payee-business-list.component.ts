import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
// state management
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { Dialog2Component } from '../dialog2/dialog2.component';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-business-list',
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
    MatToolbarModule,
    PaginatorModule,
  ],
  templateUrl: './payee-business-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-business-list.component.scss'],
})
export class PayeeBusinessListComponent implements OnDestroy, OnInit {
  search: string = '';
  loading = false;
  disabled = false;
  is_reload = false;
  clickEventSubscription?: Subscription;
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  totalRecords = 0;
  current_page = 50;

  formErrors: any = {};
  validationMessages: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    public shared: ToggleNavService,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private payeeService: PayeeServiceService
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
        data?.state_tin.includes(search.toLowerCase()) ||
        data?.lga_id?.name.toLowerCase().includes(search.toLowerCase()) ||
        data?.phone.includes(search) ||
        data?.taxpayer_name.toLowerCase().includes(search.toLowerCase()) ||
        data?.location?.name.toLowerCase().includes(search.toLowerCase())
        // this.formatDate(data?.created_at).startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable(event?: any) {
    this.isLoading = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };

    const get_current_page = event?.first + 50;
    this.current_page = get_current_page;

    this.httpService
      .getAuthSingle(BaseUrl.list_payee + `?page=${get_current_page / 50 || 1}`)
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.dtTrigger.next;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.authService.checkExpired();
        }
      );
  }

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  reload2() {
    this.is_reload = true;
    this.httpService
      .getAuthSingle(BaseUrl.list_payee + `?page=${this.current_page / 50}`)
      .subscribe(
        (data: any) => {
          this.datas = data.results;
          this.searchData = data.results;
          this.totalRecords = data?.count;
          this.dtTrigger.next;
          this.is_reload = false;
          this.snackBar.open('Loaded', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        () => {
          this.is_reload = false;
          this.authService.checkExpired();
        }
      );
  }

  openDialog() {
    this.snackBar.dismiss();
    let dialogRef = this.dialog.open(Dialog2Component, {
      data: {
        type: 'payee-regis',
        type2: 'payee',
      },
    });
    // after dialog close
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reload2();
      }
    });
  }

  goToPayee(data: any) {
    this.payeeService.setMessage(data);
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee']);
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
