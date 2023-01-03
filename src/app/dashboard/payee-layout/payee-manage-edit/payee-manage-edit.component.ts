import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { PayeeServiceService } from '../service/payee-service.service';

@Component({
  selector: 'app-payee-manage-edit',
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
    MatRadioModule,
  ],
  templateUrl: './payee-manage-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-manage-edit.component.scss'],
})
export class PayeeManageEditComponent implements OnInit {
  // floatLabelControl = new FormControl('true');
  form!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;
  datas: any;
  datas2: any;
  isdelete = false;

  constructor(
    private fb: FormBuilder,
    private payeeService: PayeeServiceService,
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.createForm();
    //
    this.datas2 = this.payeeService.getMessage();
    if (this.datas2) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    //
    this.datas = this.payeeService.getManualMessage();
    const changeData: any = this.payeeService.getManualMessage();
    this.datas = changeData.data;
    //
  }

  createForm() {
    this.form = this.fb.group({
      floatLabelControl: [{ value: 'yes', disabled: true }],
    });
    this.form2 = this.fb.group({
      floatLabelControl2: [{ value: 'true', disabled: true }],
    });
    this.form3 = this.fb.group({
      floatLabelControl3: [{ value: 'true', disabled: true }],
    });
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  changeType() {
    const pastData = {
      type: 'update',
      data: this.datas,
    };
    this.payeeService.setManualMessage(pastData);
    this.router.navigate(['dashboard/dashboard3/taxpayer/payee/manual/add']);
  }

  //  delete tax payer
  deletePayee() {
    this.isdelete = true;
    this.httpService
      .deleteData(BaseUrl.delete_paye, this.datas.id + '/')
      .subscribe(
        () => {
          this.isdelete = false;
          this.snackBar.open('Employee successfully deleted', '', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate([`/dashboard/dashboard3/taxpayer/payee/manage`]);
        },
        (err) => {
          this.isdelete = false;
          this.authService.checkExpired();
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

  updateValue2() {
    this.form.patchValue({
      floatLabelControl: this.datas?.is_consolidated ? 'yes' : 'no',
    });
    this.form2.patchValue({
      floatLabelControl2: this.datas?.compute_pension > 0 ? 'true' : 'false',
    });
    this.form3.patchValue({
      floatLabelControl3: this.datas?.compute_nhf > 0 ? 'true' : 'false',
    });
  }

  back() {
    this.payeeService.setAsYearMessage({ yearId: this.datas.taxYear });
    this.router.navigate(['/dashboard/dashboard3/taxpayer/payee/manage']);
  }

  ngOnInit(): void {
    this.updateValue2();
  }
}
