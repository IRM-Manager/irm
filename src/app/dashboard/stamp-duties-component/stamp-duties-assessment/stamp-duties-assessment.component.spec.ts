import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDutiesAssessmentComponent } from './stamp-duties-assessment.component';

describe('StampDutiesAssessmentComponent', () => {
  let component: StampDutiesAssessmentComponent;
  let fixture: ComponentFixture<StampDutiesAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampDutiesAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampDutiesAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
