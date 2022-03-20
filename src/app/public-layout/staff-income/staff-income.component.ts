import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { payee1, payee2, Person2 } from '../shared/form';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

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
  // table
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  type: Boolean = false;
  type2: Boolean = false;
  viewMode = 'file';
  clickEventSubscription?: Subscription;

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
    public shared: ToggleNavService, private fb: FormBuilder,) {
      this.createForm();
      this.createForm1();
      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
        this.datas = data.data;
        this.type = true;
      })
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

  ngOnInit(): void {
    this.authService.checkExpired();
    this.renderTable();
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
