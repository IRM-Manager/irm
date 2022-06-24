import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { department } from '../../shared/form';
// state management
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AppState,
  selectAllDepartment,
  selectAllLocation,
} from 'src/app/reducers/index';
import {
  AddDepartment,
  AddLocation,
  RemoveDepartment,
  RemoveLocation,
} from '../../../actions/irm.action';
import { Department, Locationn } from '../../models/irm';
//

@Component({
  selector: 'app-admin-console-dialog',
  templateUrl: './admin-console-dialog.component.html',
  styleUrls: ['./admin-console-dialog.component.css'],
})
export class AdminConsoleDialogComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  loading = false;
  disabled = false;

  feedbackForm: any = FormGroup;
  feedback!: department;

  stateDepartment: Observable<Department[]>;
  stateLocation: Observable<Locationn[]>;

  formErrors: any = {
    name: '',
    code: '',
  };

  validationMessages: any = {
    name: {
      required: 'required.',
    },
    code: {
      required: 'required.',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<AdminConsoleDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.authService.checkExpired();
    this.createForm();
    //
    this.stateDepartment = store.select(selectAllDepartment);
    this.stateLocation = store.select(selectAllLocation);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });

    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key];
            }
          }
        }
      }
    }
  }

  // add location or department
  onSubmit() {
    this.onValueChanged();
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.dialogRef.disableClose = true;
      this.loading = true;
      this.disabled = true;
      this.feedback = this.feedbackForm.value;
      const data = {
        name: this.feedback.name,
        code: this.feedback.code,
      };
      this.httpService
        .postData(
          this.data.type == 'add-department'
            ? BaseUrl.list_department
            : BaseUrl.list_location,
          data
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.disabled = false;
            this.feedbackFormDirective.resetForm();
            let datas2: any = [];
            // check if adding department
            if (this.data.type == 'add-department') {
              this.stateDepartment.forEach((e) => {
                if (e.length > 0) {
                  let datas = Object.assign([], e[0].data);
                  datas.unshift(data);
                  datas2 = datas;
                }
              });
              this.store.dispatch(new RemoveDepartment([{ id: 1, data: [] }]));
              this.store.dispatch(new AddDepartment([{ id: 1, data: datas2 }]));
            }
            // if not department save as location
            else {
              this.stateLocation.forEach((e) => {
                if (e.length > 0) {
                  let datas = Object.assign([], e[0].data);
                  datas.unshift(data);
                  datas2 = datas;
                }
              });
              this.store.dispatch(new RemoveLocation([{ id: 1, data: [] }]));
              this.store.dispatch(new AddLocation([{ id: 1, data: datas2 }]));
            }
            //
            this.snackBar.open('success', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.dialogRef.close();
          },
          (err: any) => {
            console.log(err);
            this.loading = false;
            this.disabled = false;
            this.snackBar.open(
              err?.error?.msg || err?.error?.detail || 'An Error Occured!',
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

  // update location or department
  onUpdate() {
    this.onValueChanged();
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.dialogRef.disableClose = true;
      this.loading = true;
      this.disabled = true;
      this.feedback = this.feedbackForm.value;
      const data = {
        name: this.feedback.name,
        code: this.feedback.code,
      };
      this.httpService
        .updateData(
          this.data.type == 'edit-department'
            ? BaseUrl.list_department
            : BaseUrl.list_location,
          data,
          this.data.data.id + '/'
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.disabled = false;
            this.feedbackFormDirective.resetForm();
            // check if adding department
            let datas: any = [];
            let indexx: any;
            if (this.data.type == 'edit-department') {
              this.stateDepartment.forEach((e) => {
                if (e.length > 0) {
                  let x = JSON.parse(JSON.stringify(e[0].data));
                  x.filter((dat: any, index: any) => {
                    if (dat.id == this.data.data.id) {
                      indexx = index;
                    }
                  });
                  datas.push(x);
                }
              });
              datas[0][indexx] = data;
              this.store.dispatch(new RemoveDepartment([{ id: 1, data: [] }]));
              this.store.dispatch(
                new AddDepartment([{ id: 1, data: datas[0] }])
              );
            }
            // if not department save as location
            else {
              let datas: any = [];
              let indexx: any;
              this.stateLocation.forEach((e) => {
                if (e.length > 0) {
                  let x = JSON.parse(JSON.stringify(e[0].data));
                  x.filter((dat: any, index: any) => {
                    if (dat.id == this.data.data.id) {
                      indexx = index;
                    }
                  });
                  datas.push(x);
                }
              });
              datas[0][indexx] = data;
              this.store.dispatch(new RemoveLocation([{ id: 1, data: [] }]));
              this.store.dispatch(new AddLocation([{ id: 1, data: datas[0] }]));
            }
            //
            this.snackBar.open('Update Successful', '', {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.dialogRef.close();
          },
          (err: any) => {
            console.log(err);
            this.loading = false;
            this.disabled = false;
            this.snackBar.open(
              err?.error?.msg || err?.error?.detail || 'An Error Occured!',
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

  //

  //  deactivate activate user
  deactivateActivate() {
    this.loading = true;
    this.disabled = true;
    this.httpService
      .getAuthSingleID(BaseUrl.activate_deactivate, this.data.data.id)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.disabled = false;
          this.snackBar.open(
            this.data.data.is_active
              ? 'User Deactivated Successfully'
              : 'User Activated Successfully',
            '',
            {
              duration: 3000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.dialogRef.close({
            active: this.data.data.is_active,
            id: this.data.data.id,
          });
        },
        (err) => {
          this.loading = false;
          this.disabled = false;
          this.snackBar.open(
            err?.error?.msg || err?.error?.detail || 'An Error Occured!',
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

  updateValue() {
    if (
      this.data.type == 'edit-department' ||
      this.data.type == 'edit-location'
    ) {
      // Update form field
      this.feedbackForm.patchValue({ name: this.data.data.name });
      this.feedbackForm.patchValue({ code: this.data.data.code });
    }
  }

  ngOnInit(): void {
    this.updateValue();
  }
}
