import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { IndPayer, ComPayer, Year } from '../../models/irm';
import {
  AppState,
  selectAllIndPayer,
  selectAllComPayer,
  selectAllYear,
} from 'src/app/reducers/index';
import {
  AddIndPayer,
  RemoveIndPayer,
  AddComPayer,
  RemoveComPayer,
  AddYear
} from '../../actions/irm.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  isdelete = false;
  year: any;
  choosen_year: number | undefined

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
    this.stateIndPayer = store.select(selectAllIndPayer);
    this.stateComPayer = store.select(selectAllComPayer);
    this.stateYear = store.select(selectAllYear);
    this.AddYear()
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
    this.router.navigate(['/dashboard4/taxpayer/payee/access']);
    this.shared.sendPayeeHeaderButtonClickEvent();
  }

  StaffIncome2() {
    const data = {
      type: 'staff-income',
      is_type: false,
    };
    this.shared.setMessage(this.data.data);
    this.shared.setMessage2(this.data.data);
    this.shared.PayeesendClickEvent(data);
    this.router.navigate(['/dashboard4/taxpayer/payee/access/staff-input']);
  }

  StaffIncome3(is_file: Boolean) {
    const data = {
      type: 'staff-income',
      is_file: is_file,
      year: this.choosen_year
    };
    this.shared.setMessage(this.data.data);
    this.shared.setMessage2(this.data.data);
    this.shared.PayeesendClickEvent(data);
    this.router.navigate(['/dashboard4/taxpayer/payee/access/staff-input']);
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  //  delete tax payer
  DeletePayer() {
    this.isdelete = true;
    this.httpService.DeletePayer(this.data.data.payer.id).subscribe(
      (data: any) => {
        this.isdelete = false;
        if (this.data.data.payer.payer_type == 'individual') {
          this.store.dispatch(new RemoveIndPayer([{ id: 1, data: [] }]));
        } else {
          this.store.dispatch(new RemoveComPayer([{ id: 1, data: [] }]));
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
        this.isdelete = false;
        this.snackBar.open('Error deleting TaxPayer', '', {
          duration: 5000,
          panelClass: 'error',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
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
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
      },
    });
  }

  EditPayerDetails(data: any, type: string) {
    if (type == 'ind') {
      this.dialogRef.close();
      this.shared.setPayerEditMessage({ data: data, type: 'ind' });
      this.router.navigate(['/dashboard2/taxpayer/ind/individual']);
    } else {
      this.dialogRef.close();
      this.shared.setPayerEditMessage({ data: data, type: 'com' });
      this.router.navigate(['/dashboard2/taxpayer/non/business']);
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
        this.httpService.year().subscribe(
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


}
