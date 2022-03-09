import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NIN } from '../shared/form';
import {Location} from '@angular/common';

@Component({
  selector: 'app-individual2',
  templateUrl: './individual2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./individual2.component.scss']
})
export class Individual2Component implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: NIN;
  loading = false;
  disabled = false;
  forms1 = ['title', 'firstname', 'middlename', 'surname']
  forms2 = ['gender', 'birth', 'place', 'state']
  forms3 = ['lga', 'nationality', 'trade', 'employment']
  forms4 = ['contact', 'contact_email']
  forms5 = ['house', 'street']
  forms6 = ['state_red', 'lga_red', 'zipcode']
  forms7 = ['employed', 'unemployed', 'retired']
  forms8 = ['com_name']
  forms9 = ['com_house', 'company_street']
  forms10 = ['com_country', 'com_state', 'com_lga', 'com_zipcode']

  formErrors: any = {
  };

  validationMessages: any = {
  };


  constructor(private fb: FormBuilder, private _location: Location) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
        nin: ['']
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
        cac: this.feedback.nin,
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

  back() {
    this._location.back();
  }

}
