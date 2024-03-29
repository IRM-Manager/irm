import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { add_user } from '../../shared/form';
// chips
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
// state management
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import {
  AppState,
  selectAllDepartment,
  selectAllGroup,
  selectAllLocation,
} from 'src/app/reducers/index';
import {
  AddDepartment,
  AddGroup,
  AddLocation,
} from '../../../actions/irm.action';
import { Department, Group, Locationn } from '../../models/irm';
import { AdminServiceService } from '../service/admin-service.service';
//

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    DataTablesModule,
    MatMenuModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  templateUrl: './edit-user.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  datas: any;
  feedbackForm: any = FormGroup;
  feedback!: add_user;
  loading = false;
  disabled = false;
  office: string = '';
  list_group: any;
  list_department: any;
  list_location: any;
  //
  options2: string[] = [];
  filteredOptions2: Observable<string[]> | undefined;
  // chips department
  separatorKeysCodesD: number[] = [ENTER, COMMA];
  filteredGroupD: Observable<string[]>;
  groupsD: string[] = [];
  allGroupD: string[] = [];
  allGroupD2: string[] = [];
  @ViewChild('groupInputD') groupInputD!: ElementRef<HTMLInputElement>;
  // chips
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredGroup: Observable<string[]>;
  groups: string[] = [];
  allGroup: string[] = [];
  allGroup2: string[] = [];
  @ViewChild('groupInput') groupInput!: ElementRef<HTMLInputElement>;
  // state management
  stateGroup: Observable<Group[]>;
  stateDepartment: Observable<Department[]>;
  stateLocation: Observable<Locationn[]>;

  formErrors: any = {
    first_name: '',
    last_name: '',
    department: '',
    group: '',
    email: '',
    office: '',
  };

  validationMessages: any = {
    first_name: {
      required: 'required.',
    },
    last_name: {
      required: 'required.',
    },
    // department: {
    //   required: 'required.',
    // },
    // group: {
    //   required: 'required.',
    // },
    office: {
      required: 'required.',
    },
    email: {
      required: 'required.',
      email: 'Not a valid email.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private service: AdminServiceService
  ) {
    this.authService.checkExpired();
    this.createForm();
    //
    this.datas = this.service.getAdminMessage();
    if (this.datas) {
    } else {
      this.router.navigate([`/dashboard/dashboard5/admin-console`]);
    }
    // group
    this.filteredGroup = this.feedbackForm.get('group').valueChanges.pipe(
      startWith(null),
      map((group: string | null) =>
        group ? this._filterGroup(group) : this.allGroup.slice()
      )
    );
    // department
    this.filteredGroupD = this.feedbackForm.get('department').valueChanges.pipe(
      startWith(null),
      map((group: string | null) =>
        group ? this._filterGroupD(group) : this.allGroupD.slice()
      )
    );
    // state
    this.stateGroup = store.select(selectAllGroup);
    this.stateDepartment = store.select(selectAllDepartment);
    this.stateLocation = store.select(selectAllLocation);
    //
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      department: [''],
      group: [''],
      office: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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

  onSubmit() {
    this.onValueChanged();
    console.log(this.feedbackForm.value);
    const feed1 = this.feedbackFormDirective.invalid;
    if (feed1) {
      this.snackBar.open('Errors in Form fields please check it out.', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.feedback = this.feedbackForm.value;
      // let list_group_id: any = [];
      let list_perm_id: any = [];
      let list_department_id: any = [];
      // get department id
      this.groupsD.filter((element: any) => {
        const get_id = this.list_department.find((name: any) => {
          return name.name == element;
        });
        list_department_id.push(get_id.id);
        for (const x of get_id.permission) {
          list_perm_id.push(x?.id);
        }
      });
      // ewewfewfw
      // get location id
      const form_location = this.list_location.filter(
        (name: any) => name.name == this.feedback.office
      );
      // get group ids
      // this.groups.filter((element: any) => {
      //   const get_id = this.list_group.filter((name: any) => {
      //     return name.name == element;
      //   });
      //   list_group_id.push(get_id[0].id);
      // });
      // check if group is valid
      // if (list_group_id.length < 1) {
      //   this.snackBar.open('Please select a valid group.', '', {
      //     duration: 5000,
      //     panelClass: 'error',
      //     horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //   });
      // }
      // check if department is valid
      if (list_department_id.length < 1) {
        this.snackBar.open('Please Select a valid department.', '', {
          duration: 5000,
          panelClass: 'error',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } // check if location is valid
      else if (form_location.length < 1) {
        this.snackBar.open('Please Choose a valid location.', '', {
          duration: 5000,
          panelClass: 'error',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        this.loading = true;
        this.disabled = true;
        let correct_data = {
          first_name: this.feedback.first_name,
          last_name: this.feedback.last_name,
          email: this.feedback.email,
          groups: { department: list_department_id, perm: list_perm_id },
          location: form_location[0].id,
          phone: this.datas.data.phone,
          is_staff: this.datas.data.is_staff,
        };
        console.log(correct_data);
        this.httpService
          .updateData(BaseUrl.edit_user, correct_data, this.datas.data.id)
          .subscribe(
            () => {
              this.loading = false;
              this.disabled = false;
              // this.feedbackFormDirective.resetForm();
              this.snackBar.open('Update Successful', '', {
                duration: 4000,
                panelClass: 'success',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.router.navigate(['/dashboard/dashboard5/admin-console']);
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
    } // end else
  }

  // chips for groups
  remove(fruit: string): void {
    const index = this.groups.indexOf(fruit);
    if (index >= 0) {
      this.groups.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const index = this.groups.indexOf(event.option.viewValue);
    if (index == -1) {
      this.groups.push(event.option.viewValue);
      this.groupInputD.nativeElement.value = '';
      this.feedbackForm.get('department').setValue(null);
      //
      this.allGroup = this.allGroup2;
    }
    // update the
    this.filteredGroup = this.feedbackForm.get('group').valueChanges.pipe(
      startWith(null),
      map((group: string | null) =>
        group ? this._filterGroup(group) : this.allGroup.slice()
      )
    );
  }

  private _filterGroup(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allGroup.filter((group) =>
      group.toLowerCase().includes(filterValue)
    );
  }
  // end of chips group

  // chips for department
  removeD(fruit: string): void {
    const index = this.groupsD.indexOf(fruit);
    if (index >= 0) {
      this.groupsD.splice(index, 1);
    }
  }

  selectedD(event: MatAutocompleteSelectedEvent): void {
    const index = this.groupsD.indexOf(event.option.viewValue);
    if (index == -1) {
      this.groupsD.push(event.option.viewValue);
      this.groupInputD.nativeElement.value = '';
      this.feedbackForm.get('department').setValue(null);
      //
      this.allGroupD = this.allGroupD2;
    }
    // update the
    this.filteredGroupD = this.feedbackForm.get('department').valueChanges.pipe(
      startWith(null),
      map((group: string | null) =>
        group ? this._filterGroupD(group) : this.allGroupD.slice()
      )
    );
  }

  private _filterGroupD(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allGroupD.filter((group) =>
      group.toLowerCase().includes(filterValue)
    );
  }
  // end of chips for department

  // Update form field
  updateValue() {
    this.feedbackForm.patchValue({ first_name: this.datas?.data?.first_name });
    this.feedbackForm.patchValue({ last_name: this.datas?.data?.last_name });
    this.feedbackForm.patchValue({
      middle_name: this.datas?.data?.middle_name,
    });
    const datasD: any = [];
    this.datas?.data?.department.forEach((element: any) => {
      datasD.push(element.name);
    });
    this.groupsD = datasD;
    this.feedbackForm.patchValue({ office: this.datas?.data?.location?.name });
    this.feedbackForm.patchValue({ email: this.datas?.data.email });
    const datas: any = [];
    this.datas?.data?.groups.forEach((element: any) => {
      datas.push(element.name);
    });
    this.groups = datas;
  }

  // add group
  addGroup() {
    this.stateGroup.forEach((e) => {
      if (e.length > 0) {
        this.list_group = e[0].data;
        const datas: any = [];
        e[0].data.forEach((element: any) => {
          datas.push(element.name);
        });
        this.allGroup = datas;
        this.allGroup2 = datas;
        this.filteredGroup = this.feedbackForm.get('group').valueChanges.pipe(
          startWith(null),
          map((group: string | null) =>
            group ? this._filterGroup(group) : this.allGroup.slice()
          )
        );
        console.log('group_state', e[0].data);
      } else {
        this.httpService.getAuthSingle(BaseUrl.list_group).subscribe(
          (data: any) => {
            this.list_group = data.data;
            const datas: any = [];
            data.data.forEach((element: any) => {
              datas.push(element.name);
            });
            //
            this.allGroup = datas;
            this.allGroup2 = datas;
            this.filteredGroup = this.feedbackForm
              .get('group')
              .valueChanges.pipe(
                startWith(null),
                map((group: string | null) =>
                  group ? this._filterGroup(group) : this.allGroup.slice()
                )
              );
            //
            this.store.dispatch(new AddGroup([{ id: 1, data: data.data }]));
          },
          () => {
            console.log('group errorrrrrrr');
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  // add department
  addDepartment() {
    this.stateDepartment.forEach((e) => {
      if (e.length > 0) {
        this.list_department = e[0].data;
        const datas: any = [];
        e[0].data.forEach((element: any) => {
          datas.push(element.name);
        });
        //
        this.allGroupD = datas;
        this.allGroupD2 = datas;
        this.filteredGroupD = this.feedbackForm
          .get('department')
          .valueChanges.pipe(
            startWith(null),
            map((group: string | null) =>
              group ? this._filterGroupD(group) : this.allGroupD.slice()
            )
          );
        //
        console.log('department_state', e[0].data);
      } else {
        this.httpService.getAuthSingle(BaseUrl.list_department).subscribe(
          (data: any) => {
            this.list_department = data.results;
            const datas: any = [];
            data.results.forEach((element: any) => {
              datas.push(element.name);
            });

            //
            this.allGroupD = datas;
            this.allGroupD2 = datas;
            this.filteredGroupD = this.feedbackForm
              .get('department')
              .valueChanges.pipe(
                startWith(null),
                map((group: string | null) =>
                  group ? this._filterGroupD(group) : this.allGroupD.slice()
                )
              );
            //
            this.store.dispatch(
              new AddDepartment([{ id: 1, data: data.results }])
            );
          },
          () => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  // add location
  addLocation() {
    this.stateLocation.forEach((e) => {
      if (e.length > 0) {
        this.list_location = e[0].data;
        const datas: any = [];
        e[0].data.forEach((element: any) => {
          datas.push(element.name);
        });
        this.options2 = datas;
        //
        this.filteredOptions2 = this.feedbackForm
          .get('office')
          .valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter2(value))
          );
        //
        console.log('location', e[0].data);
      } else {
        this.httpService.getAuthSingle(BaseUrl.list_location).subscribe(
          (data: any) => {
            this.list_location = data.results;
            const datas: any = [];
            data.results.forEach((element: any) => {
              datas.push(element.name);
            });
            this.options2 = datas;
            //
            this.filteredOptions2 = this.feedbackForm
              .get('office')
              .valueChanges.pipe(
                startWith(''),
                map((value: string) => this._filter2(value))
              );
            //
            this.store.dispatch(
              new AddLocation([{ id: 1, data: data.results }])
            );
          },
          () => {
            this.authService.checkExpired();
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.updateValue();

    this.filteredOptions2 = this.feedbackForm.get('office').valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter2(value))
    );

    this.addDepartment();
    this.addGroup();
    this.addLocation();
  }

  private _filter2(value: string) {
    const filterValue = value.toLowerCase();
    return this.options2.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
