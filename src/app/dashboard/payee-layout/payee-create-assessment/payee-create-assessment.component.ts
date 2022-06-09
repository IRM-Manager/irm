import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { create_assessment } from '../../shared/form';

@Component({
  selector: 'app-payee-create-assessment',
  templateUrl: './payee-create-assessment.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-create-assessment.component.scss'],
})
export class PayeeCreateAssessmentComponent implements OnInit {
  @ViewChild('fform3') feedbackFormDirective3: any;

  feedbackForm3: any = FormGroup;
  feedback!: create_assessment;
  loading = false;
  options: string[] = ['2020', '2021', '2022'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.createForm3();
  }

  createForm3() {
    this.feedbackForm3 = this.fb.group({
      year: [''],
      typee: ['Pay E'],
      employee_no: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    this.feedback = this.feedbackForm3.value;
    console.log(this.feedback);
    this.loading = false;
  }

  ngOnInit(): void {
    this.authService.checkExpired();

    this.filteredOptions = this.feedbackForm3.get('year').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
