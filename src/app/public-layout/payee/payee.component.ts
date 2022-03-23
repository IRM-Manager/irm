import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Tin, Person } from '../shared/form';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { ComPayer } from '../../models/irm';
import { AppState, selectAllComPayer } from 'src/app/reducers/index';
import { AddComPayer } from '../../actions/irm.action';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseUrl } from 'src/environments/environment';


@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee.component.scss']
})
export class PayeeComponent implements OnDestroy, OnInit {

  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: Tin;
  active: any = 'ind';
  left_text!: string;
  loading = false;
  disabled = false;
  is_reload = false;
  viewMode = 'verify';
  clickEventSubscription?: Subscription;

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  stateComPayer: Observable<ComPayer[]>;

  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();

  formErrors: any = {
  };

  validationMessages: any = {
  };

  constructor(private router: Router, private direct: ActivatedRoute, private fb: FormBuilder,
    private authService: AuthService, private http: HttpClient, private dialog: MatDialog,
    public shared: ToggleNavService, private httpService: HttpService, private store: Store<AppState>,
    private snackBar: MatSnackBar) {
      this.createForm();

      this.stateComPayer = store.select(selectAllComPayer);

      this.direct.paramMap.subscribe(params => {
        if (params.get('id') === '' || params.get('id') === undefined || params.get('id') === null) {
        }
        else {
          if (params.get('id') == 'staff-income') {
            this.viewMode = 'staff-income';
          }
          else {}
        }
      })
      
      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
        this.viewMode = data.type;
      })
  }

  decodedToken = this.helper.decodeToken(this.authService.getRefreshToken());

  createForm() {
    this.feedbackForm = this.fb.group({
        tin: ['']
      },
    );
    this.feedbackForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {

    this.loading = true
    this.disabled = true
    this.feedback = this.feedbackForm.value;

    this.httpService.GetPayerTin(this.feedback.tin)
    .subscribe(
      (data: any) => {
        this.loading = false
        this.disabled = false;
        if (data.data.payer.payer_type == "company") {
          if (this.decodedToken.user_id == data.data.user.id) {
            const datas = {
              type: 'staff-income',
              data: data.data
            }
            this.shared.PayeesendClickEvent(datas);
            this.snackBar.open("Valid", "", {
              duration: 3000,
              panelClass: "success"
            });
          }
          else {
            this.snackBar.open("You do not have permission to access this Payer", "", {
              duration: 5000,
              panelClass: "error"
            });
          }
        }
        else {
          this.snackBar.open("Not A Registered Business Taxpayer", "", {
            duration: 5000,
            panelClass: "error"
          });
        }
      },
      err => {
        this.loading = false
        this.disabled = false;
        this.authService.refreshToken();
        console.log(err)
        if (err.status === 404) {
          this.snackBar.open("Tin or Reg.No does not exists", "", {
            duration: 5000,
            panelClass: "error"
          });
        }
        else {
          this.snackBar.open('Error', "", {
            duration: 5000,
            panelClass: "error"
          });
        }
      }
    )
    // end of subscribe
  }


  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

      this.stateComPayer?.forEach(e => {
        if(e.length > 0 ) {
          this.datas = e[0].data;
          console.log(e[0].data)
          this.dtTrigger.next
        }
        else {
          this.httpService.GetPayerList().subscribe(
            (data:any) => {
              console.log(data.data.company_tax_payer)
              if(data.responsecode == "01"){
              }else{
                this.store.dispatch(new AddComPayer([{id: 1, data: data.data.company_tax_payer}]));
                this.datas = data.data.company_tax_payer;
                this.dtTrigger.next
              }
            },
            err => {
              this.authService.refreshToken();
            }
          )
        }
      }) 
  }


  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
  }

  Reload() {
    this.is_reload = true;
    this.renderTable();
    this.is_reload = false;
  }


  OpenDialog(data: any, type: string) {
    if (this.decodedToken.user_id == data.user.id) {
      this.snackBar.dismiss()
      let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          type: type,
          data: data
        }
      });
    }
    else {
      this.snackBar.open("You do not have permission to access this Payer", "", {
        duration: 5000,
        panelClass: "error"
      });
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
