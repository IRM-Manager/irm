import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeAssessmentComponent } from './payee-assessment.component';

describe('PayeeAssessmentComponent', () => {
  let component: PayeeAssessmentComponent;
  let fixture: ComponentFixture<PayeeAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
