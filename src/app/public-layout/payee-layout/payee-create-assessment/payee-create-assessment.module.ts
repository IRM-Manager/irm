import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeCreateAssessmentRoutingModule } from './payee-create-assessment-routing.module';
import { PayeeCreateAssessmentComponent } from './payee-create-assessment.component';
// module
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    PayeeCreateAssessmentComponent
  ],
  imports: [
    CommonModule,
    PayeeCreateAssessmentRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class PayeeCreateAssessmentModule { }
