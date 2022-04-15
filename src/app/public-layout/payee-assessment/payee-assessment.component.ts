import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Tin } from '../shared/form';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
// state management
import { Store } from '@ngrx/store';
import { Year, Payee } from '../../models/irm';
import { AppState, selectAllYear, selectAllPayee } from 'src/app/reducers/index';
import { AddPayee, AddYear, RemovePayee } from '../../actions/irm.action';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseUrl } from 'src/environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-payee-assessment',
  templateUrl: './payee-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-assessment.component.scss']
})
export class PayeeAssessmentComponent implements OnInit {

  @ViewChild('fformsearch') searchFormDirective: any;

  SearchForm: any = FormGroup;
  active: any = 'ind';
  left_text!: string;
  is_reload = false;
  viewMode = 'verify';
  routeviewMode = "access"
  clickEventSubscription?: Subscription;
  isLoading = false;
  currentYear = new Date().getFullYear();
  currentYearID: any;
  year: any;

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  payeedata2: any;
  payeedata: any;
  searchData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  payeeEventData: any;

  stateYear: Observable<Year[]>;
  statePayee: Observable<Payee[]>;

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
    private snackBar: MatSnackBar, private location: Location) {

      this.authService.checkExpired();
      this.createSearchForm();
      this.trackSearchField();

      this.statePayee = store.select(selectAllPayee);
      this.stateYear = store.select(selectAllYear);

      this.payeedata = this.shared.getMessage();
      this.payeedata2 = this.shared.getMessage2();
      console.log("Payeeeee\n",this.payeedata)
      if (this.payeedata == undefined || this.payeedata == null) {
        this.router.navigate(['/dashboard3/taxpayer/payee'])
      }else {}

      this.direct.paramMap.subscribe(params => {
        if (params.get('id') === '' || params.get('id') === undefined || params.get('id') === null) {
          this.routeviewMode = "access"
        }
        else {
          if (params.get('id') == 'staff-input') {
            this.routeviewMode = 'staff';
            this.viewMode = "staff-income"
          }
          else {
            this.routeviewMode = "access"
          }
        }
      })
      
      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
        this.viewMode = data.type;
      })

  }

  formatDate(data: any) {
    var d = new Date(data),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
  }


  keyPress(search: any) {
    const data = this.searchData?.filter((data: any) => {
      return data.payer.tin.toLowerCase().startsWith(search.toLowerCase()) ||
      data.organisation_name.toLowerCase().startsWith(search.toLowerCase()) ||
      data.org_phone.toLowerCase().startsWith(search.toLowerCase()) ||
      this.formatDate(data.payer.created_at).startsWith(search.toLowerCase())
    })
    console.log(data)
    this.datas = data;
  }


  changeCurrentYear(data: any) {
    this.currentYear = data.year;
    this.currentYearID = data.id;
    this.store.dispatch(new RemovePayee([{id: 1, data: []}]));
    this.renderTable(data.id);
  }


  createSearchForm() {
    this.SearchForm = this.fb.group({
        search: ['']
      },
    );
  }

  trackSearchField(): void {
    this.SearchForm.get('search')
      .valueChanges
      .subscribe((field: string) => {
        if(field === undefined) {
        }else {
          this.keyPress(field)
        }
      }); 
  }


  renderTable(year: number) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

      this.isLoading = true;
      this.statePayee?.forEach(e => {
        if(e.length > 0 ) {
          this.datas = e[0].data;
          this.searchData = e[0].data;
          console.log(e[0].data)
          this.dtTrigger.next
          this.isLoading = false;
        }
        else {
          this.httpService.GetPayee(this.payeedata?.payer?.tin, this.currentYearID || year || 23).subscribe(
            (data:any) => {
              console.log(data.data)
              if(data.responsecode == "01"){
              }else{
                this.store.dispatch(new AddPayee([{id: 1, data: data.data}]));
                this.datas = data?.data;
                this.searchData = data?.data;
                this.dtTrigger.next
                this.isLoading = false;
              }
            },
            err => {
              this.isLoading = false;
              this.authService.checkExpired();
            }
          )
        }
      }) 
  }


  AddYear() {
    this.stateYear.forEach(e => {
      if(e.length > 0 ) {
        this.year = e[0].data.data;
      }
      else {
        this.httpService.year().subscribe(
          (data:any) => {
            if(data.responsecode == "01"){
            }else{
              this.store.dispatch(new AddYear([{id: 1, data: data}]));
              this.year = data.data;
              this.currentYearID = data.data.slice(-1)[0].id;
              this.store.dispatch(new RemovePayee([{id: 1, data: []}]));
              this.renderTable(data.data.slice(-1)[0].id);
            }
          },
          err => {
          }
        )
      }
    }) 
  }


  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable(this.currentYearID);
    this.AddYear();
  }

  Reload() {
    this.is_reload = true;
    this.renderTable(this.currentYearID);
    this.is_reload = false;
  }

  formatMoney(n: any) {
    const tostring = n.toString()
   return (Math.round(tostring * 100) / 100).toLocaleString();
 }


  OpenDialog(data: any, type: string) {
      this.snackBar.dismiss()
      let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          type: type,
          data: data,
          data2: this.payeedata2
        }
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
