import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeCreateAssessmentComponent } from './payee-create-assessment.component';

describe('PayeeCreateAssessmentComponent', () => {
  let component: PayeeCreateAssessmentComponent;
  let fixture: ComponentFixture<PayeeCreateAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeCreateAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeCreateAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
