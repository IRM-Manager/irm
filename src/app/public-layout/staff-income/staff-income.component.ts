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
import { Router } from '@angular/router';

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
  selected_year: any;
  isSavingR: any[] = [];
  update = false;
  updateIndex!: number;

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
    private httpService: HttpService, private snackBar: MatSnackBar, private router: Router,) {
      this.authService.checkExpired();
      this.createForm();
      this.createForm1();

      this.stateYear = store.select(selectAllYear);

      this.clickEventSubscription = this.shared.PayeegetClickEvent2().subscribe(() => {
        this.selected_year = this.shared.PayeegetdataEvent();
        this.GetPayeeDataEvent();
        if (this.shared.getMessage3() === undefined) {
        }else {
          console.log("proviouse data", this.shared.getMessage3())
          this.data = this.shared.getMessage3();
          this.renderTable(this.shared.getMessage3())
          this.type = true;
        }
      })

      
      this.data = this.shared.getMessage();
      this.data2 = this.shared.getMessage2();

      if (this.shared.PayeegetdataEvent() === undefined) {
      }else {
        this.selected_year = this.shared.PayeegetdataEvent();
        this.GetPayeeDataEvent();
      }

      if (this.shared.getMessage3() === undefined) {
      }else {
        console.log("proviouse data", this.shared.getMessage3())
        this.data = this.shared.getMessage3();
        this.renderTable(this.shared.getMessage3())
        this.type = true;
      }

   }


   GetPayeeDataEvent() {
    // this.fileName = "";
    // this.formData = new FormData();
    switch(this.selected_year?.is_file) {
      case 'file':
        console.log("file")
        this.viewMode = "file"
        this.feedbackForm.controls['year'].setValue(`${this.selected_year?.year?.id}|${this.selected_year?.year?.year}`);
        break;
      case 'input':
        console.log("input")
        this.viewMode = "input"
        this.feedbackForm.controls['year'].setValue(`${this.selected_year?.year?.id}|${this.selected_year?.year?.year}`);
        break;
      default:
        this.viewMode = "input"
        this.feedbackForm.controls['year'].setValue(`${this.selected_year?.year?.id}|${this.selected_year?.year?.year}`);
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
    // "pension":true,
    const datas = {
      employeeTin: this.feedback1.tin, basic: this.feedback2.basic, yearId: get_year[0],
      housing: this.feedback2.housing, pension: false, tp: this.feedback2.transport,
      nhis: this.feedback2.other || parseFloat('0.0'), employee_position: this.feedback1.position,
    }
    console.log("form daata",datas)
    this.httpService.AddSinglePayee(datas, this.data2?.payer?.tin, get_year[0]).subscribe(
      (data: any) => {
        this.loading = false;
        this.disabled = false;
        this.datas.push(data.data);
        this.type2 = true;
        this.clearForm();
        this.snackBar.open("Successfully Added", "", {
          duration: 3000,
          panelClass: "success",
          horizontalPosition: "center",
          verticalPosition: "top",
        });
        console.log("added payee data",data)
      },
      err => {
        console.log(err)
        this.authService.checkExpired();
        this.loading = false;
        this.disabled = false;
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


  onUpdate() {
    this.loading = true
    this.disabled = true
    this.feedback1 = this.feedbackForm.getRawValue();
    this.feedback2 = this.feedbackForm1.getRawValue();
    // "pension":true,
    console.log(this.feedback1)
    const datas = {
      employeeTin: this.feedback1.tin, basic: this.feedback2.basic, nhf: false,
      housing: this.feedback2.housing, pension: false, tp: this.feedback2.transport,
      nhis: this.feedback2.other || parseFloat('0.0'), employee_position: this.feedback1.position,
    }
    const get_year = this.feedback1?.year.split('|')
    console.log("form daata",datas)
    this.httpService.UpdatePayee(datas, this.data2?.payer?.tin, get_year[0]).subscribe(
      (data: any) => {
        this.loading = false;
        this.disabled = false;
        this.update = false;
        // this.datas.splice(this.updateIndex, 1)
        this.datas[this.updateIndex] = data.data;
        this.feedbackForm.controls['year'].enable();
        this.feedbackForm.controls['tin'].enable();
        this.datas.push(data.data);
        this.type2 = true;
        this.clearForm();
        this.snackBar.open("Successfully Updated", "", {
          duration: 3000,
          panelClass: "success",
          horizontalPosition: "center",
          verticalPosition: "top",
        });
        console.log("updated payee data",data)
      },
      err => {
        console.log(err)
        this.authService.checkExpired();
        this.loading = false;
        this.disabled = false;
        this.update = false;
        if (err.status === 500) {
          this.snackBar.open("An error occur. Please try Again", "", {
            duration: 5000,
            panelClass: "error",
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        }
        else if(err.status === 400) {
          this.snackBar.open(err.error?.detail || err.error?.message || "An error occur. Please try Again", "", {
            duration: 5000,
            panelClass: "error",
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        }
        else if(err.status === 404) {
          this.snackBar.open(err.error.detail, "", {
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


  UploadFIle() {
    console.log(this.data)
    this.upLoading = true
    const d = new Date();
    let year = d.getFullYear();

      this.httpService.UploadPayeeFile(this.formData, this.data?.payer?.tin, this.selected_year?.year?.id)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.OpenDialog(data,'extract')
        },
        err => {
          this.authService.checkExpired();
          this.upLoading = false;
          console.log(err)
          if (err.status === 500) {
            this.snackBar.open(err.error?.detail || "Invalid data format or File not Valid! (Should be CSV)", "", {
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
    this.shared.setMessage3(undefined)
    this.shared.setMessage4(undefined)
    this.router.navigate(['dashboard4/taxpayer/payee/access'])
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
      this.shared.setMessage4(this.datas);
      this.shared.setMessage2(this.data2);
      this.shared.PayeesendClickEvent(data);
    }

  }

  OpenDialog(data: any, type: string) {
    const get_year = this.feedbackForm.getRawValue();
    console.log(get_year)
    this.dialog.open(DialogComponent, {
      data: {
        type: type,
        data: data,
        data2: this.data2,
        data3: this.viewMode == 'file' ? this.selected_year.year : get_year.year.split('|')
      }
    });
    
  }

  remove(id: any, index2: number) {
    const form_data = this.feedbackForm.getRawValue();
    const check = this.datas.filter((data: any) => {
      return data.id == id
    })
    if(check[0].employeeTin == form_data.tin) {
      this.snackBar.open("Cannot Delete what you want to Edit!", "", {
        duration: 5000,
        panelClass: "error",
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }
    else {
      this.isSavingR.push(id);
      this.httpService.DeletePayee(id).subscribe(
        (data:any) => {
            const index = this.isSavingR.indexOf(id);
            if (index > -1) {
              this.isSavingR.splice(index, 1);
            }
            this.datas.splice(index2, 1);
            this.snackBar.open("Successfully deleted", "", {
              duration: 3000,
              panelClass: "success",
              horizontalPosition: "center",
              verticalPosition: "top",
            });
        },
        err => {
          this.authService.checkExpired();
          const index = this.isSavingR.indexOf(id);
          if (index > -1) {
            this.isSavingR.splice(index, 1);
          }
        })
    }

  }


  Edit(data: any, index: number) {
    this.updateIndex = index;
    this.update = true;
    this.feedbackForm.controls['year'].setValue(`${data.yearId}|${data.taxYear}`);
    this.feedbackForm.controls['year'].disable();
    this.feedbackForm.patchValue({name: data.employee});
    this.feedbackForm.patchValue({tin: data.employeeTin});
    this.feedbackForm.controls['tin'].disable();
    this.feedbackForm.patchValue({position: data.employee_position});
    this.feedbackForm1.patchValue({basic: data.basic});
    this.feedbackForm1.patchValue({housing: data.housing});
    this.feedbackForm1.patchValue({transport: data.tp});
    this.viewMode = 'input';
    this.type2 = true;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.shared.PayeesendClickEvent2();
  }

}
