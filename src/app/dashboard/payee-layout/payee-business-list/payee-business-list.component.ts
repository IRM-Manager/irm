import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  templateUrl: './payee-business-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-business-list.component.scss'],
})
export class PayeeBusinessListComponent implements OnInit {
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

  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();

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
        data.state_tin.includes(search.toLowerCase()) ||
        data.lga_id.name.toLowerCase().includes(search.toLowerCase()) ||
        data.phone.includes(search) ||
        data.taxpayer_name.toLowerCase().includes(search.toLowerCase()) ||
        data.location.name.toLowerCase().includes(search.toLowerCase())
        // this.formatDate(data?.created_at).startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };
    this.isLoading = true;
    this.httpService.getAuthSingle(BaseUrl.list_payee).subscribe(
      (data: any) => {
        this.datas = data.results;
        this.searchData = data.results;
        this.dtTrigger.next;
        this.isLoading = false;
      },
      (err) => {
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
    this.httpService.getAuthSingle(BaseUrl.list_payee).subscribe(
      (data: any) => {
        this.datas = data.results.reverse();
        this.searchData = data.results;
        this.dtTrigger.next;
        this.is_reload = false;
        this.snackBar.open('Loaded', '', {
          duration: 3000,
          panelClass: 'success',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      (err) => {
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
