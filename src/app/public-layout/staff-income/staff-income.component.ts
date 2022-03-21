import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { payee1, payee2, Person2 } from '../shared/form';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
// state management
import { select, Store } from '@ngrx/store';
import { Year } from '../../models/irm';
import * as konpayActions from '../../actions/irm.action';
import { AppState, selectAllYear } from 'src/app/reducers/index';
import { AddYear, RemoveYear } from '../../actions/irm.action';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-staff-income',
  templateUrl: './staff-income.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./staff-income.component.scss']
})
export class StaffIncomeComponent implements OnDestroy, OnInit {

  @ViewChild('fform') feedbackFormDirective: any;
  @ViewChild('fform1') feedbackFormDirective1: any;
  feedbackForm: any = FormGroup;
  feedbackForm1: any = FormGroup;
  feedback1!: payee1;
  feedback2!: payee2;
  loading = false;
  disabled = false;
  yearLoading = false;
  yearError = false;
  upLoading = false
  year: any;
  // table
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  type: Boolean = false;
  type2: Boolean = false;
  formData = new FormData();
  viewMode = 'file';
  clickEventSubscription?: Subscription;
  fileName = '';

  stateYear: Observable<Year[]>;

  formErrors: any = {
    'name': '', 'tin': '', 'year': '', 'basic': '', 'housing': '', 'transport': '',
  };

  validationMessages: any = {
    'name': {
      'required':      'required.',
    },
    'tin': {
      'required':      'required.',
    },
    'year': {
      'required':      'required.',
    },
    'basic': {
      'required':      'required.',
    },
    'housing': {
      'required':      'required.',
    },
    'transport': {
      'required':      'required.',
    },
   
  };

  constructor(private dialog: MatDialog, private authService: AuthService,
    public shared: ToggleNavService, private fb: FormBuilder, private store: Store<AppState>,
    private httpService: HttpService) {
      this.createForm();
      this.createForm1();

      this.stateYear = store.select(selectAllYear);

      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
        this.datas = data.data;
        this.type = true;
      })
   }


   onFileSelected(event: any) {
    const file:File = event.target.files[0];
      if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append("file", file);
          this.formData = formData;
      }
    }


   createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required] ],
      tin: ['', [Validators.required] ],
      year: ['', [Validators.required] ],
      position: [''],
      },
    );

    this.feedbackForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  createForm1() {
    this.feedbackForm1 = this.fb.group({
        basic: ['', [Validators.required] ],
        housing: ['', [Validators.required] ],
        transport: ['', [Validators.required] ],
        other: [''],
      },
    );

    this.feedbackForm1.valueChanges
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

  onValueChanged2(data?: any) {
    if (!this.feedbackForm1) { return; }
    const form = this.feedbackForm1;
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
    this.feedback1 = this.feedbackForm.value;
    this.feedback2 = this.feedbackForm1.value;

    console.log(this.feedback1)
    console.log(this.feedback2)
  }

  UploadFIle() {

    this.upLoading = true
    // this.formData
    
  }


  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.datas = Person2;
    // this.http.get<any[]>('data/data.json')
    //   .subscribe((data: any) => {
    //     this.persons = (data as any).data;
    //     // Calling the DT trigger to manually render the table
    //     this.dtTrigger.next
    //   });
  }


  AddYear() {
    this.yearLoading = true;
    this.yearError = false;
    this.stateYear.forEach(e => {
      if(e.length > 0 ) {
        this.year = e[0].data.data;
        console.log(e[0].data)
        this.yearLoading = false;
        this.yearError = false;
      }
      else {
        this.httpService.year().subscribe(
          (data:any) => {
            if(data.responsecode == "01"){
            }else{
              this.store.dispatch(new AddYear([{id: 1, data: data}]));
              this.year = data.data;
              this.yearLoading = false;
              this.yearError = false;
            }
          },
          err => {
            this.yearLoading = false;
            this.yearError = true;
          }
        )
      }
    }) 
  }


  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
    this.AddYear();
  }

  back() {
    const data = {
      type: 'verify',
      data: null
    }
    this.shared.PayeesendClickEvent(data);
  }

  Continue() {
    const data = {
      type: 'tax-income',
      data: this.datas
    }
    this.shared.PayeesendClickEvent(data);
  }

  OpenDialog(data: any, type: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
