import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// state management
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { AddYear } from '../../actions/irm.action';
import { Year } from '../models/irm';
import { PayeeDialogComponent } from '../payee-layout/payee-dialog/payee-dialog.component';
import { PayeeServiceService } from '../payee-layout/service/payee-service.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @ViewChild('manual') manualDirective: any;
  manualError = '';

  isdelete = false;
  year: any;
  choosen_year: number | undefined;
  isExtract = false;
  selected_year: any;
  payee_data: any;
  stateYear: Observable<Year[]>;
  confirmUploadErr = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialogRefPayee: MatDialogRef<PayeeDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService,
    private payeeService: PayeeServiceService
  ) {
    this.authService.checkExpired();
    if (this.data.type == 'extract') {
      dialogRef.disableClose = true;
      this.payee_data = this.data.data.data.data;
    }
    // else if (this.data.type == 'ind' || this.data.type == 'com') {
    //   dialogRef.disableClose = true;
    // }
    this.stateYear = store.select(selectAllYear);
    this.addYear();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  StaffIncome() {
    const data = {
      type: 'staff-income',
      is_type: false,
    };
    this.shared.setMessage(this.data.data);
    this.shared.setMessage2(this.data.data);
    this.shared.PayeesendClickEvent(data);
    this.shared.PayeesenddataEvent(data);
    this.router.navigate(['/dashboard/dashboard4/taxpayer/payee/access']);
    this.shared.sendPayeeHeaderButtonClickEvent(true);
  }

  StaffIncome2() {
    const data = {
      type: 'staff-income',
      is_type: false,
    };
    this.shared.setMessage(this.data.data);
    this.shared.setMessage2(this.data.data);
    this.shared.PayeesendClickEvent(data);
    this.shared.PayeesenddataEvent(data);
    this.router.navigate([
      '/dashboard/dashboard4/taxpayer/payee/access/staff-input',
    ]);
  }

  // manual input chaeck tax id http function
  staffIncome3() {
    this.isExtract = true;
    this.httpService
      .getAuthSingle(BaseUrl.get_payer_tin + this.manualDirective.value.manual)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.isExtract = false;
          this.snackBar.dismiss();
          if (data.data?.organisation_name) {
            this.manualError = 'Invalid Tax ID';
            this.snackBar.open('Invalid Tax ID', '', {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            const pastData = {
              type: 'post',
              data: data.data,
            };
            this.payeeService.setManualMessage(pastData);
            this.dialogRef.close();
            this.snackBar.open('Valid', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate([
              'dashboard/dashboard3/taxpayer/payee/manual/add',
            ]);
          }
        },
        (err) => {
          this.isExtract = false;
          this.authService.checkExpired();
          console.log(err);
          this.manualError =
            err?.error?.message ||
            err?.error?.msg ||
            err?.error?.detail ||
            err?.error?.status ||
            'An Error Occured!';
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

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  //  delete tax payer
  deletePayer() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_update_payer, this.data.data.id + '/')
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          this.confirmUploadErr = '';
          this.snackBar.open('TaxPayer successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close({
            type: this.data.data?.organisation_name ? 'com' : 'ind',
            id: this.data.data.id,
          });
        },
        (err) => {
          console.log(err);
          this.authService.checkExpired();
          this.isdelete = false;
          this.confirmUploadErr =
            err?.error?.message ||
            err?.error?.msg ||
            err?.error?.detail ||
            err?.error?.status ||
            'An Error Occured!';
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

  //  delete tax payer
  deletePayee() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_paye, this.data.data.id + '/')
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          this.confirmUploadErr = '';
          this.snackBar.open('Employee successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close({
            id: this.data.data.id,
          });
        },
        (err) => {
          this.authService.checkExpired();
          this.isdelete = false;
          console.log(err);
          this.confirmUploadErr =
            err?.error?.message ||
            err?.error?.msg ||
            err?.error?.detail ||
            err?.error?.status ||
            'An Error Occured!';
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
    this.dialogRef.close();
    this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  payeeDialog(type: string) {
    if (this.selected_year) {
      const data2 = {
        year: this.choosen_year,
      };
      this.snackBar.dismiss();
      this.dialogRef.close();
      this.dialog.open(PayeeDialogComponent, {
        data: {
          type: type,
          data: data2,
        },
      });
    } else {
      this.snackBar.open('Please Select Year', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  addYear() {
    this.stateYear.forEach((e) => {
      if (e.length > 0) {
        this.year = e[0].data;
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
            this.year = data.results;
          },
          (err) => {}
        );
      }
    });
  }

  extract_continue() {
    this.isExtract = true;
    const data = { data: this.payee_data };
    if (this.payee_data.length !== 0) {
      this.httpService
        .postData(
          BaseUrl.confirm_upload +
            `comp_tin=${this.data.data.data2.company.state_tin}&yearId=${this.data.data.year.id}&is_consolidated=${this.data.data.is_con2}`,
          data
        )
        .subscribe(
          (data: any) => {
            this.isExtract = false;
            this.snackBar.open('Success', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.payeeService.setAsYearMessage({yearId: this.data.data.year.year});
            this.payeeService.sendAsClickEvent();
            this.dialogRef.close({
              reload: true,
              year: this.data.data.year.id,
            });
          },
          (err) => {
            this.isExtract = false;
            this.authService.checkExpired();
            console.log(err);
            this.confirmUploadErr =
              err?.error?.message ||
              err?.error?.msg ||
              err?.error?.detail ||
              err?.error?.status ||
              'An Error Occured!';
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
    } else {
      this.isExtract = false;
      this.confirmUploadErr = 'Cannot Add Empty Employee';
      this.snackBar.open('Cannot Add Empty Employee', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  chooseYear(data: any) {
    this.choosen_year = data;
    this.selected_year = data;
  }

  goToPayee() {
    this.payeeService.setMessage(this.data.data);
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee']);
  }
}
