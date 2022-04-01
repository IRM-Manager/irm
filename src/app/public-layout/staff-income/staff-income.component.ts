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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  data: any;
  data2: any;
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
    private httpService: HttpService, private snackBar: MatSnackBar) {
      this.authService.checkExpired()
      this.createForm();
      this.createForm1();

      this.stateYear = store.select(selectAllYear);

      this.clickEventSubscription = this.shared.PayeegetClickEvent().subscribe((data: any) => {
      })

      this.data = this.shared.getMessage();
      this.data2 = this.shared.getMessage2();
      if (this.shared.getMessage3() === undefined) {
      }else {
        console.log("proviouse data", this.shared.getMessage3())
        this.data = this.shared.getMessage3();
        this.renderTable(this.shared.getMessage3())
        this.type = true;
      }

   }


   onFileSelected(event: any) {
    if(this.data === undefined) {
      const data = {
        type: 'verify'
      }
      this.shared.PayeesendClickEvent(data);
      this.snackBar.open("Unable to retrieve data", "", {
        duration: 5000,
        panelClass: "error",
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }else {
      const file:File = event.target.files[0];
      if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append("file", file);
          this.formData = formData;
      }
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

  clearForm() {
    this.feedbackForm.get('tin').reset();
    this.feedbackForm.get('name').reset();
    this.feedbackForm.get('position').reset();
    this.feedbackForm1.get('basic').reset();
    this.feedbackForm1.get('housing').reset();
    this.feedbackForm1.get('transport').reset();
    this.feedbackForm1.get('other').reset();
  }

  onSubmit() {

    this.loading = true
    this.disabled = true
    this.feedback1 = this.feedbackForm.value;
    this.feedback2 = this.feedbackForm1.value;

    const get_year = this.feedback1.year.split('|')
    // check employee tin
    this.httpService.GetPayerTin(this.feedback1.tin).subscribe(
      (userId: any) => {
        console.log(userId)
        if (userId.data.payer.payer_type == "individual"){
            this.httpService.GetPayee(this.feedback1.tin, get_year[0])
            .subscribe(
              (dataa: any) => {

                if (dataa.data.length > 0) {
                  this.loading = false;
                  this.disabled = false;
                  this.datas.push(dataa.data);
                  // this.renderTable(dataa.data);
                  this.type2 = true;
                  this.clearForm();
                  console.log("get payee list wheter regis",dataa)
                }
                else{
                  console.log("data2",this.data2)
                  const datas = {
                    payerId: this.data2.payer.id, employerTin: this.data2.payer.tin,
                    employeeTin: this.feedback1.tin, status: true, basic: this.feedback2.basic,
                    housing: this.feedback2.housing, pension: false, nhf: false, tp: this.feedback2.transport,
                    nhis: this.feedback2.other || parseFloat('0.0'), employee_position: this.feedback1.position || userId.data.profession_trade,
                    taxYear: get_year[1], yearId: get_year[0]
                    // employerId: this.data2.user.id
                  }
                  console.log("form daata",datas)
                  this.httpService.AddSinglePayee(datas).subscribe(
                    (data: any) => {
                      this.loading = false;
                      this.disabled = false;
                      this.datas.push(data.data);
                      // this.renderTable(data.data);
                      this.type2 = true;
                      this.clearForm();
                      console.log("added payee data",data)
                    },
                    err => {
                      console.log(err)
                      this.loading = false;
                      this.disabled = false;
                      this.authService.refreshToken();
                      if (err.status === 500) {
                        this.snackBar.open("An error occur. Please try Again", "", {
                          duration: 5000,
                          panelClass: "error",
                          horizontalPosition: "center",
                          verticalPosition: "top",
                        });
                      }
                      else if(err.status === 400) {
                        this.snackBar.open(err.error.message, "", {
                          duration: 5000,
                          panelClass: "error",
                          horizontalPosition: "center",
                          verticalPosition: "top",
                        });
                      }
                      else {
                        this.snackBar.open("Error", "", {
                          duration: 5000,
                          panelClass: "error",
                          horizontalPosition: "center",
                          verticalPosition: "top",
                        });
                      }
                    }
                  )
                  // end
                }
                // end else
              },
              err => {
                this.loading = false;
                this.disabled = false;
                console.log(err)
                this.authService.refreshToken();
                this.snackBar.open("Error", "", {
                  duration: 5000,
                  panelClass: "error",
                  horizontalPosition: "center",
                  verticalPosition: "top",
                });
              }
            ) // end subscription
        }
        else {
          this.loading = false;
          this.disabled = false;
          this.snackBar.open('Invalid Tin', "", {
            duration: 5000,
            panelClass: "error",
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        }

      },
      err => {
        this.loading = false;
          this.disabled = false;
          this.authService.refreshToken();
          if (err.status === 404) {
            this.snackBar.open("Employee Tin does not exists", "", {
              duration: 5000,
              panelClass: "error",
              horizontalPosition: "center",
              verticalPosition: "top",
            });
          }
          else {
            this.snackBar.open('Error', "", {
              duration: 5000,
              panelClass: "error",
              horizontalPosition: "center",
              verticalPosition: "top",
            });
          }
      }
    )


  }


  UploadFIle() {
    console.log(this.data)
    this.upLoading = true
    const d = new Date();
    let year = d.getFullYear();
    const get_year = this.year.filter((data: any) => {
      return data.year === year.toString();
    });

      this.httpService.UploadPayeeFile(this.formData, this.data.payer.tin, get_year[0].id)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.httpService.UploadPayeeValidatedFile({data: data.data}, this.data.payer.tin, get_year[0].id).subscribe(
            (data: any) => {
              this.upLoading = false;
              console.log(data)
              this.datas = data.data;
              this.renderTable(data.data);
              this.type = true;
            },
            err => {
              this.upLoading = false;
              console.log(err)
              if (err.status === 500) {
                this.snackBar.open("An error occur. Please try Again", "", {
                  duration: 5000,
                  panelClass: "error",
                  horizontalPosition: "center",
                  verticalPosition: "top",
                });
              }
              else if (err.status === 0) {
                this.snackBar.open("Error", "", {
                  duration: 5000,
                  panelClass: "error",
                  horizontalPosition: "center",
                  verticalPosition: "top",
                });
              }
              else {
                this.snackBar.open(err.error?.status || "Error Uploading File", "", {
                  duration: 5000,
                  panelClass: "error",
                  horizontalPosition: "center",
                  verticalPosition: "top",
                });
              }
            }
          )
        },
        err => {
          this.authService.refreshToken();
          this.upLoading = false;
          console.log(err)
          if (err.status === 500) {
            this.snackBar.open("Invalid data format or File not Valid! (Should be CSV)", "", {
              duration: 5000,
              panelClass: "error",
              horizontalPosition: "center",
              verticalPosition: "top",
            });
          }
          else if (err.status === 0) {
            this.snackBar.open("Error Uploading File", "", {
              duration: 5000,
              panelClass: "error",
              horizontalPosition: "center",
              verticalPosition: "top",
            });
          }
          else {
            this.snackBar.open(err.error?.status || "Error Uploading File", "", {
              duration: 5000,
              panelClass: "error",
              horizontalPosition: "center",
              verticalPosition: "top",
            });
          }
        }
      )
      // end of subscribe

  }


  renderTable(data: any) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.datas = data;
    this.dtTrigger.next
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
    this.AddYear();
  }

  back() {
    const data = {
      type: 'verify',
      data: null
    }
    this.shared.setMessage(undefined)
    this.shared.setMessage2(undefined)
    this.shared.setMessage3(undefined)
    this.shared.PayeesendClickEvent(data);
  }

   formatMoney(n: any) {
     const tostring = n.toString()
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  Continue() {
    if (this.datas?.length == 0){
      this.snackBar.open("Employee not yet added!", "", {
        duration: 5000,
        panelClass: "error",
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }
    else{
      const data = {
        type: 'tax-income',
      }
      this.shared.setMessage(this.datas);
      this.shared.setMessage2(this.data2);
      this.shared.PayeesendClickEvent(data);
    }

  }

  OpenDialog(data: any, type: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
        data2: this.data2
      }
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
