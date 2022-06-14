import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
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
import {
  AppState,
  selectAllComPayer,
  selectAllIndPayer,
  selectAllYear,
} from 'src/app/reducers/index';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import {
  AddComPayer,
  AddIndPayer,
  AddYear,
  RemoveComPayer,
  RemoveIndPayer,
} from '../../actions/irm.action';
import { ComPayer, IndPayer, Year } from '../models/irm';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  isdelete = false;
  year: any;
  choosen_year: number | undefined;
  isExtract = false;
  selected_year: any;
  payee_data: any;

  stateIndPayer: Observable<IndPayer[]>;
  stateComPayer: Observable<ComPayer[]>;
  stateYear: Observable<Year[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private router: Router,
    public shared: ToggleNavService,
    private authService: AuthService
  ) {
    this.authService.checkExpired();
    if (this.data.type == 'extract') {
      dialogRef.disableClose = true;
      this.payee_data = this.data.data.data;
    } else if (this.data.type == 'ind' || this.data.type == 'com') {
      dialogRef.disableClose = true;
    }
    this.stateIndPayer = store.select(selectAllIndPayer);
    this.stateComPayer = store.select(selectAllComPayer);
    this.stateYear = store.select(selectAllYear);
    this.AddYear();
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

  StaffIncome3(is_file: string) {
    this.shared.PayeesendClickEvent('');
    this.shared.PayeesenddataEvent('');
    if (this.choosen_year == undefined) {
      this.snackBar.open('Choose Year', '', {
        duration: 4000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      const data = {
        type: 'staff-income',
        is_file: is_file,
        year: this.choosen_year,
      };
      this.shared.PayeesendClickEvent(data);
      this.shared.PayeesenddataEvent(data);
      this.shared.sendPayeeHeaderButtonClickEvent(true);
      this.shared.PayeesendClickEvent2();
      this.router.navigate([
        '/dashboard/dashboard4/taxpayer/payee/access/staff-input',
      ]);
      this.dialogRef.close();
    }
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  //  delete tax payer
  DeletePayer() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_update_payer, this.data.data.id + '/')
      .subscribe(
        (data: any) => {
          this.isdelete = false;
          if (this.data?.data?.organisation_name) {
            let datas: any = [];
            let indexx;
            this.stateComPayer.forEach((e) => {
              if (e.length > 0) {
                let x = JSON.parse(JSON.stringify(e[0].data));
                x.filter((data: any, index: any) => {
                  if (data.id == this.data.data.id) {
                    indexx = index;
                  }
                });
                datas.push(x);
              }
            });
            datas[0].splice(indexx, 1);
            this.store.dispatch(new RemoveComPayer([{ id: 1, data: [] }]));
            this.store.dispatch(new AddComPayer([{ id: 1, data: datas[0] }]));
          } else {
            let datas: any = [];
            let indexx;
            this.stateIndPayer.forEach((e) => {
              if (e.length > 0) {
                let x = JSON.parse(JSON.stringify(e[0].data));
                x.filter((data: any, index: any) => {
                  if (data.id == this.data.data.id) {
                    indexx = index;
                  }
                });
                datas.push(x);
              }
            });
            datas[0].splice(indexx, 1);
            this.store.dispatch(new RemoveIndPayer([{ id: 1, data: [] }]));
            this.store.dispatch(new AddIndPayer([{ id: 1, data: datas[0] }]));
          }
          this.snackBar.open('TaxPayer successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.isdelete = false;
          this.snackBar.open(
            err.error.detail || err.error.msg || 'Error deleting TaxPayer',
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
  DeletePayee() {
    this.isdelete = true;
    // this.httpService.DeletePayer(this.data.data.payer.id).subscribe(
    //   (data: any) => {
    //     this.isdelete = false;
    //     if (this.data.data.payer.payer_type == 'individual') {
    //       this.store.dispatch(new RemoveIndPayer([{ id: 1, data: [] }]));
    //     } else {
    //       this.store.dispatch(new RemoveComPayer([{ id: 1, data: [] }]));
    //     }
    //     this.snackBar.open('TaxPayer successfully deleted', '', {
    //       duration: 3000,
    //       panelClass: 'success',
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //     });
    //     this.dialogRef.close();
    //   },
    //   (err) => {
    //     this.isdelete = false;
    //     this.snackBar.open('Error deleting TaxPayer', '', {
    //       duration: 5000,
    //       panelClass: 'error',
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //     });
    //   }
    // );
  }

  OpenDialog(data: any, type: string) {
    this.snackBar.dismiss();
    this.dialogRef.close();
    this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  EditPayerDetails(data: any, type: string) {
    if (type == 'ind') {
      this.shared.setPayerEditMessage({ data: data, type: 'ind' });
      this.dialogRef.close();
      this.router.navigate(['/dashboard/dashboard22/taxpayer/ind/individual']);
    } else {
      this.shared.setPayerEditMessage({ data: data, type: 'com' });
      this.dialogRef.close();
      this.router.navigate(['/dashboard/dashboard22/taxpayer/non/business']);
    }
  }

  ChooseYear(data: any) {
    this.choosen_year = data;
  }

  AddYear() {
    this.stateYear.forEach((e) => {
      if (e.length > 0) {
        this.year = e[0].data.data;
        console.log('dialog_redux_year', e[0].data.data);
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            if (data.responsecode == '01') {
            } else {
              this.store.dispatch(new AddYear([{ id: 1, data: data }]));
              this.year = data.data;
              console.log('dialog_year', data.data);
            }
          },
          (err) => {}
        );
      }
    });
  }

  extract_continue() {
    this.selected_year = this.shared.PayeegetdataEvent();
    this.isExtract = true;
    const data = { data: this.payee_data };
    console.log(this.payee_data);
    if (this.payee_data.length !== 0) {
      this.httpService
        .postData(BaseUrl.list_year, data)
        // this.data.data2.payer.tin,
        // this.data.data3.id || this.data.data3[0]
        .subscribe(
          (data: any) => {
            this.isExtract = false;
            this.shared.setMessage3(data.data);
            const dataa = {
              type: 'staff-income',
            };
            this.shared.PayeesendClickEvent(dataa);
            this.shared.PayeesendClickEvent2();
            this.dialogRef.close();
            this.snackBar.dismiss();
            this.snackBar.open('Success', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          (err) => {
            this.isExtract = false;
            console.log(err);
            if (err.status === 500) {
              this.snackBar.open('An error occur. Please try Again', '', {
                duration: 5000,
                panelClass: 'error',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            } else if (err.status === 0) {
              this.snackBar.open('Error', '', {
                duration: 5000,
                panelClass: 'error',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            } else {
              this.snackBar.open(
                err.error?.status ||
                  err.error?.detail ||
                  'Error Uploading File',
                '',
                {
                  duration: 5000,
                  panelClass: 'error',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                }
              );
            }
          }
        );
    } else {
      this.isExtract = false;
      this.snackBar.open('Cannot Add Empty Employee', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  closeDialog() {
    this.shared.setMessage3(undefined);
    const dataa = {
      type: 'staff-income',
    };
    this.shared.PayeesendClickEvent(dataa);
    this.shared.PayeesendClickEvent2();
    this.dialogRef.close();
  }

  DeteleAddedPayee(index: number) {
    this.payee_data.splice(index, 1);
  }
}
