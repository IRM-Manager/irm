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
import { ActivatedRoute, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { PaginatorModule } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { DialogComponent } from '../../dialog/dialog.component';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { TaxpayerDialogComponent } from '../taxpayer-dialog/taxpayer-dialog.component';

@Component({
  selector: 'app-tax-payer',
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
  templateUrl: './tax-payer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./tax-payer.component.scss'],
})
export class TaxPayerComponent implements OnDestroy, OnInit {
  search: string = '';
  active: any = 'ind';
  left_text!: string;
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  totalRecords = 0;
  current_page = 50;

  constructor(
    private router: Router,
    private direct: ActivatedRoute,
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

  renderTable(event?: any) {
    this.isLoading = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };

    console.log(event);
    const get_current_page = event?.first + 50;
    this.current_page = get_current_page;
    let url = '';
    if (this.active == 'com') {
      url =
        BaseUrl.list_com_payer +
        `&page=${get_current_page / 50 || this.current_page / 50 || 1}`;
    } else if (this.active == 'all') {
      url =
        BaseUrl.list_all_payer +
        `&page=${get_current_page / 50 || this.current_page / 50 || 1}`;
    } else {
      url =
        BaseUrl.list_ind_payer +
        `&page=${get_current_page / 50 || this.current_page / 50 || 1}`;
    }
    this.httpService.getAuthSingle(url).subscribe(
      (data: any) => {
        console.log(data);
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

  reload() {
    this.renderTable();
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
