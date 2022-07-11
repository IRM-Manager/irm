import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { map, Observable, startWith } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { add_user } from '../../shared/form';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: add_user;
  loading = false;
  disabled = false;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  options2: string[] = ['One', 'Two', 'Three'];
  filteredOptions2: Observable<string[]> | undefined;

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
    department: {
      required: 'required.',
    },
    group: {
      required: 'required.',
    },
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
    private store: Store<AppState>
  ) {
    this.authService.checkExpired();
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      group: ['', [Validators.required]],
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
      this.disabled = true;

      this.feedback = this.feedbackForm.value;

      let data = {
        first_name: this.feedback.first_name,
        last_name: this.feedback.last_name,
        departmant: this.feedback.department,
        email: this.feedback.email,
        groups: this.feedback.group,
        office: this.feedback.office,
      };
      console.log(data);

      // this.httpService.postData(BaseUrl.add_com_payer, data).subscribe(
      //   (data: any) => {
      //     this.loading = false;
      //     this.disabled = false;
      //     // this.snackBar.open('Registration successful', '', {
      //     //   duration: 3000,
      //     //   panelClass: 'success',
      //     //   horizontalPosition: 'center',
      //     //   verticalPosition: 'top',
      //     // });\
      //     this.feedbackFormDirective.resetForm()
      //     let datas2: any = [];
      //     this.stateComPayer.forEach((e) => {
      //       if (e.length > 0) {
      //         let datas = Object.assign([], e[0].data);
      //         datas.unshift(data.data);
      //         datas2 = datas;
      //       }
      //     });
      //     this.store.dispatch(new RemoveComPayer([{ id: 1, data: [] }]));
      //     this.store.dispatch(new AddComPayer([{ id: 1, data: datas2 }]));
      //     this.router.navigate(['/dashboard/dashboard2/taxpayer']);
      //     this.OpenDialog(data.data);
      //   },
      //   (err: any) => {
      //     console.log(err);
      //     this.loading2 = false;
      //     this.disabled2 = false;
      //     this.snackBar.open(
      //       err?.error?.msg || err?.error?.detail || 'An Error Occured!',
      //       '',
      //       {
      //         duration: 5000,
      //         panelClass: 'error',
      //         horizontalPosition: 'center',
      //         verticalPosition: 'top',
      //       }
      //     );
      //   }
      // );
    } // end else
  }

  initAnimations(): void {
    gsap.from(this.card.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      y: 40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  ngOnInit(): void {
    this.initAnimations();
    this.filteredOptions = this.feedbackForm
      .get('department')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this._filter(value))
      );

    this.filteredOptions2 = this.feedbackForm.get('group').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter2(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
