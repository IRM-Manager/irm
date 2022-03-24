import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Person } from '../shared/form';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
// state management
import { Store } from '@ngrx/store';
import { IndPayer, ComPayer } from '../../models/irm';
import { AppState, selectAllIndPayer, selectAllComPayer } from 'src/app/reducers/index';
import { AddIndPayer, RemoveIndPayer, AddComPayer, RemoveComPayer } from '../../actions/irm.action';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseUrl } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnDestroy, OnInit {

  active: any = 'ind';
  left_text!: string;
  is_reload = false;
  isLoading = false;

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  stateIndPayer: Observable<IndPayer[]>;
  stateComPayer: Observable<ComPayer[]>;

  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;
  private helper = new JwtHelperService();

  constructor(private router: Router, private direct: ActivatedRoute, private store: Store<AppState>,
    private authService: AuthService, private httpService: HttpService, private dialog: MatDialog,
    private snackBar: MatSnackBar) {

    this.direct.paramMap.subscribe(params => {
      if (params.get('id') === '' || params.get('id') === undefined || params.get('id') === null) {
        this.active = 'ind';
        this.left_text = "Tax Registration of Individuals";
      }
      else if  (params.get('id') == 'non') {
        this.active = 'com';
        this.left_text = "Tax Registration of Business";

      }
      else if  (params.get('id') == 'ind') {
        this.active = 'ind';
        this.left_text = "Tax Registration of Individuals";
      }
      else {
        this.active = 'ind';
        this.left_text = "Tax Registration of Individuals";
      }
      this.renderTable();
      
    })

    this.stateIndPayer = store.select(selectAllIndPayer);
    this.stateComPayer = store.select(selectAllComPayer);

  }

  decodedToken = this.helper.decodeToken(this.authService.getRefreshToken());

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    if (this.active == 'com') {
      this.isLoading = true;
      this.stateComPayer?.forEach(e => {
        if(e.length > 0 ) {
          this.datas = e[0].data;
          console.log(e[0].data)
          this.dtTrigger.next
          this.isLoading = false;
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
                this.isLoading = false;
              }
            },
            err => {
              this.isLoading = false;
              this.authService.refreshToken();
            }
          )
        }
      }) 
    }
    else {
      this.isLoading = true;
      this.stateIndPayer?.forEach(e => {
        if(e.length > 0 ) {
          this.datas = e[0].data;
          console.log(e[0].data)
          this.dtTrigger.next
          this.isLoading = false;
        }
        else {
          this.httpService.GetPayerList().subscribe(
            (data:any) => {
              console.log(data.data.individual_tax_payer)
              if(data.responsecode == "01"){
              }else{
                this.store.dispatch(new AddIndPayer([{id: 1, data: data.data.individual_tax_payer}]));
                this.datas = data.data.individual_tax_payer;
                this.dtTrigger.next
                this.isLoading = false;
              }
            },
            err => {
              this.isLoading = false;
              this.authService.refreshToken();
            }
          )
        }
      }) 
    }


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


  changeActive(type: string) {
    this.active = type;
    if (type=="com") {
      this.left_text = "Tax Registration of Business";
      this.router.navigate(['/dashboard2/taxpayer/non']);
    }
    else {
      this.left_text = "Tax Registration of Individuals";
      this.router.navigate(['/dashboard2/taxpayer/ind']);
    }
    this.renderTable();
  }

  redirectActive() {
    if (this.active == 'ind') {
      this.router.navigate(['/dashboard2/taxpayer/ind/individual'])
    }
    else {
      this.router.navigate(['/dashboard2/taxpayer/non/business'])
    }
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
