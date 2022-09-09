import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// state management
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { DialogComponent } from '../../dialog/dialog.component';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { TaxpayerDialogComponent } from '../taxpayer-dialog/taxpayer-dialog.component';

@Component({
  selector: 'app-tax-payer',
  templateUrl: './tax-payer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./tax-payer.component.scss'],
})
export class TaxPayerComponent implements OnDestroy, OnInit {
  search: string = '';
  active: any = 'ind';
  left_text!: string;
  is_reload = false;
  isLoading = false;

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();

  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();

  constructor(
    private router: Router,
    private direct: ActivatedRoute,
    private store: Store<AppState>,
    private authService: AuthService,
    private httpService: HttpService,
    private dialog: MatDialog,
    public shared: ToggleNavService,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkExpired();

    this.direct.paramMap.subscribe((params) => {
      if (
        params.get('id') === '' ||
        params.get('id') === undefined ||
        params.get('id') === null
      ) {
        this.active = 'all';
        this.left_text = 'All Registration of TaxPayers';
      } else if (params.get('id') == 'non') {
        this.active = 'com';
        this.left_text = 'Tax Registration of Business';
      } else if (params.get('id') == 'ind') {
        this.active = 'ind';
        this.left_text = 'Tax Registration of Individuals';
      } else {
        this.active = 'all';
        this.left_text = 'All Registration of TaxPayers';
      }
      this.renderTable();
    });
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
        data.state_tin.toLowerCase().includes(search.toLowerCase()) ||
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };

    let url = '';

    if (this.active == 'com') {
      url = BaseUrl.list_com_payer;
    } else if (this.active == 'all') {
      url = BaseUrl.list_all_payer;
    } else {
      url = BaseUrl.list_ind_payer;
    }

    this.isLoading = true;
    this.httpService.getAuthSingle(url).subscribe(
      (data: any) => {
        console.log(data.results);
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

  reload() {
    this.is_reload = true;
    this.renderTable();
    this.is_reload = false;
  }

  changeActive(type: any) {
    const type2 = type.target[type.target.selectedIndex].value;
    if (type2 == 'com') {
      this.active = 'com';
      this.left_text = 'Tax Registration of Business';
      this.router.navigate(['/dashboard/dashboard2/taxpayer/non']);
    } else if (type2 == 'ind') {
      this.active = 'ind';
      this.left_text = 'Tax Registration of Individuals';
      this.router.navigate(['/dashboard/dashboard2/taxpayer/ind']);
    } else {
      this.active = 'all';
      this.left_text = 'All Registration of TaxPayers';
      this.router.navigate(['/dashboard/dashboard2/taxpayer']);
    }
    this.renderTable();
  }

  openDialog(data: any, type: string) {
    this.snackBar.dismiss();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });

    // after dialog close
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.type == 'ind') {
          // update individual search data
          this.searchData.filter((dat: any, index: any) => {
            if (dat.id == result.id) {
              this.searchData.splice(index, 1);
            }
          });
        } else {
        }
        // update table data
        this.datas.filter((dat: any, index: any) => {
          if (dat.id == result.id) {
            this.datas.splice(index, 1);
          }
        });
      } else {
      }
    });
  }

  openRegisDialog() {
    this.dialog.open(TaxpayerDialogComponent, {
      data: {
        type: 'regis',
      },
    });
  }

  editDetails(data: any, type: string) {
    if (type == 'individual') {
      this.shared.setPayerEditMessage({ data: data, type: 'ind' });
      this.router.navigate(['/dashboard/dashboard22/taxpayer/ind/individual']);
    } else {
      this.shared.setPayerEditMessage({ data: data, type: 'com' });
      this.router.navigate(['/dashboard/dashboard22/taxpayer/non/business']);
    }
  }

  viewPayer(data: any) {
    this.shared.setMessage4(data);
    this.router.navigate(['/dashboard/dashboard22/taxpayer']);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
