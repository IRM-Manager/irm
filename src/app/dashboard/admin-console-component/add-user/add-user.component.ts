import { CommonModule } from '@angular/common';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
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
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    RouterModule,
  ],
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
