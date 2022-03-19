import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tin, Person } from '../shared/form';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  viewMode = 'tax-income';

  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  formErrors: any = {
  };

  validationMessages: any = {
  };

  constructor(private router: Router, private direct: ActivatedRoute, private fb: FormBuilder,
    private authService: AuthService, private http: HttpClient, private dialog: MatDialog) {
      this.createForm();
  }

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

    const data = {
        cac: this.feedback.tin,
    }
    console.log(this.feedback)
    // perform login
    // this.authService.login(user)
    // .subscribe(
    //   (data: any) => {
    //     this.loading = false
    //     this.disabled = false;
    //     if (data) {
    //       this.router.navigate(['/dashboard']);
    //       this.snackBar.open('success', "", {
    //         duration: 3000,
    //         panelClass: "success"
    //       });
    //     }

    //   }
    // )
    // end of subscribe
  }


  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.datas = Person;
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
