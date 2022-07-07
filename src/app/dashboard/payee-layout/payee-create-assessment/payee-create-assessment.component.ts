import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { create_assessment } from '../../shared/form';
import { PayeeServiceService } from '../service/payee-service.service';
// state management
import { Store } from '@ngrx/store';
import { map, Observable, startWith, Subject, Subscription } from 'rxjs';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { AddYear } from '../../../actions/irm.action';
import { Year } from '../../models/irm';
import { BaseUrl } from 'src/environments/environment';
//

@Component({
  selector: 'app-payee-create-assessment',
  templateUrl: './payee-create-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-create-assessment.component.scss'],
})
export class PayeeCreateAssessmentComponent implements OnInit {
  @ViewChild('fform3') feedbackFormDirective3: any;

  feedbackForm3: any = FormGroup;
  feedback!: create_assessment;
  loading = false;
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  datas: any;
  stateYear: Observable<Year[]>;
  years: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private store: Store<AppState>,
    private payeeService: PayeeServiceService
  ) {
    this.authService.checkExpired();
    this.stateYear = store.select(selectAllYear);
    //
    this.datas = this.payeeService.getMessage();
    if (this.datas) {
    } else {
      this.router.navigate([
        `/dashboard/dashboard3/taxpayer/payee/business-list`,
      ]);
    }
    //
    this.createForm3();
  }

  createForm3() {
    this.feedbackForm3 = this.fb.group({
      year: ['', [Validators.required]],
      typee: ['Pay E'],
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm3.value;
    const feed1 = this.feedbackFormDirective3.invalid;
    if (feed1) {
      this.snackBar.open('Year not selected!', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading = true;
      const get_year = this.years.filter((name: any) => {
        return name.year == this.feedback.year;
      });
      const data = { item_code: '001', yearId: get_year[0].id };
      this.httpService
        .postData(
          BaseUrl.create_payee_ass + `tin=${this.datas.company.state_tin}`,
          data
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.payeeService.setAYearMessage({ yearId: this.feedback.year });
            this.snackBar.dismiss();
            this.snackBar.open('Success', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate([
              `/dashboard/dashboard3/taxpayer/payee/lists`,
            ]);
          },
          (err) => {
            this.loading = false;
            this.authService.checkExpired();
            console.log(err);
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
  }

  listYear() {
    this.stateYear?.forEach((e) => {
      if (e.length > 0) {
        this.years = e[0].data;
        const years: any = [];
        e[0]?.data?.forEach((element: any) => {
          years.push(element.year);
        });
        this.options = years;
        this.filteredOptions = this.feedbackForm3.get('year').valueChanges.pipe(
          startWith(''),
          map((value: string) => this._filter(value))
        );
      } else {
        this.httpService.getSingleNoAuth(BaseUrl.list_year).subscribe(
          (data: any) => {
            this.years = data.results;
            const years: any = [];
            data?.results.forEach((element: any) => {
              years.push(element.year);
            });
            this.options = years;
            this.filteredOptions = this.feedbackForm3
              .get('year')
              .valueChanges.pipe(
                startWith(''),
                map((value: string) => this._filter(value))
              );
            this.store.dispatch(new AddYear([{ id: 1, data: data.results }]));
          },
          (err) => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.feedbackForm3.controls['typee'].disable();
    this.authService.checkExpired();
    this.listYear();
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    return this.options.filter((option) => option.includes(filterValue));
  }
}
