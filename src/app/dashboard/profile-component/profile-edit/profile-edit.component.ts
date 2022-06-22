import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { editUser } from '../../shared/form';
import { Store } from '@ngrx/store';
import { ProfileServiceService } from '../service/profile-service.service';
import { Observable } from 'rxjs';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AddProfile, RemoveProfile } from '../../../actions/irm.action';
import { Profile } from '../../../dashboard/models/irm';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  datas: any;
  feedbackForm: any = FormGroup;
  feedback!: editUser;
  loading = false;
  disabled = false;

  stateProfile: Observable<Profile[]>;

  formErrors: any = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
  };

  validationMessages: any = {
    first_name: {
      required: 'required.',
    },
    last_name: {
      required: 'required.',
    },
    phone: {
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
    private router: Router,
    private service: ProfileServiceService,
    private store: Store<AppState>,
  ) {
    this.authService.checkExpired();
    this.createForm();
    //
    this.stateProfile = store.select(selectAllProfile);
    // 
    this.datas = this.service.getAdminMessage();
    if (this.datas) {
    } else {
      this.router.navigate([`/dashboard/dashboard5/account`]);
    }
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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
      this.loading = true;
      // 
      let get_group_ids: any = [];
      this.datas.groups
      this.datas.groups.filter((name: any) => {
        get_group_ids.push(name.id)
      })
      this.feedback = this.feedbackForm.value;
      let data = {
        first_name: this.feedback.first_name,
        last_name: this.feedback.last_name,
        phone: this.feedback.phone,
        email: this.feedback.email,
        department: this.datas.department.id,
        groups: get_group_ids,
        location: this.datas.location.id,
        is_staff: this.datas.is_staff,
      };
      this.httpService
        .updateData(BaseUrl.edit_user, data, this.datas.id)
        .subscribe(
          (data: any) => {
            this.store.dispatch(new RemoveProfile([{ id: 1, data: [] }]));
            this.loading = false;
            this.disabled = false;
            // reset form value
            this.feedbackFormDirective.resetForm();
            // 
            this.snackBar.open('Update Successful', '', {
              duration: 4000,
              panelClass: 'success',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.store.dispatch(new AddProfile([{ id: 1, data: data }]))
            this.router.navigate(['/dashboard/dashboard5/account']);
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
    } // end else
  }

  // Update form field
  updateValue() {
    this.feedbackForm.patchValue({ first_name: this.datas.first_name });
    this.feedbackForm.patchValue({ last_name: this.datas.last_name });
    this.feedbackForm.patchValue({ email: this.datas.email });
    this.feedbackForm.patchValue({ phone: this.datas.phone });
  }

  ngOnInit(): void {
    this.updateValue();
  }
}
