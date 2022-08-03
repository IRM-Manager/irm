import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingGenerateAssessmentComponent } from './witholding-generate-assessment.component';

describe('WitholdingGenerateAssessmentComponent', () => {
  let component: WitholdingGenerateAssessmentComponent;
  let fixture: ComponentFixture<WitholdingGenerateAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingGenerateAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingGenerateAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
