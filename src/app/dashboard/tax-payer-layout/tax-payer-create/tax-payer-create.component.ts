import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';

@Component({
  selector: 'app-tax-payer-create',
  templateUrl: './tax-payer-create.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./tax-payer-create.component.scss'],
})
export class TaxPayerCreateComponent implements OnInit {
  datas: any;
  isdelete = false;
  search: string = '';

  is_reload = false;
  isLoading = false;

  dtOptions: DataTables.Settings = {};
  datasTable: any[] = [];
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private _location: Location,
    public shared: ToggleNavService,
    private authService: AuthService
  ) {
    this.datas = this.shared.getMessage4();
    if (this.datas) {
    } else {
      this._location.back();
    }
  }

  editDetails() {
    if (this.datas.payer_type == 'individual') {
      this.shared.setPayerEditMessage({ data: this.datas, type: 'ind' });
      this.router.navigate(['/dashboard/dashboard22/taxpayer/ind/individual']);
    } else {
      this.shared.setPayerEditMessage({ data: this.datas, type: 'com' });
      this.router.navigate(['/dashboard/dashboard22/taxpayer/non/business']);
    }
  }

  //  delete tax payer
  deletePayer() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_update_payer, this.datas.id + '/')
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          this.snackBar.open('TaxPayer successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          if (this.datas.payer_type == 'individual') {
            this.router.navigate(['/dashboard/dashboard2/taxpayer/ind']);
          } else {
            this.router.navigate(['/dashboard/dashboard2/taxpayer/non']);
          }
        },
        (err) => {
          console.log(err);
          this.authService.checkExpired();
          this.isdelete = false;
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

  modelChange(search: any) {
    const data = this.searchData?.filter((data: any) => {
      return (
        data.state_tin.toLowerCase().startsWith(search.toLowerCase()) ||
        data.lga_id.name.toLowerCase().startsWith(search.toLowerCase()) ||
        data.phone.startsWith(search) ||
        data.taxpayer_name.toLowerCase().startsWith(search.toLowerCase()) ||
        data.location.name.toLowerCase().startsWith(search.toLowerCase())
      );
    });
    this.datasTable = data;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthChange: false,
      info: false,
    };

    this.isLoading = true;
    this.httpService.getAuthSingle(BaseUrl.list_all_payer).subscribe(
      (data: any) => {
        this.datasTable = data.results;
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

  reload() {
    this.is_reload = true;
    this.renderTable();
    this.is_reload = false;
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
