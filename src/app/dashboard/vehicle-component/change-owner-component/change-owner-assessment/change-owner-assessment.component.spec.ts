import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOwnerAssessmentComponent } from './change-owner-assessment.component';

describe('ChangeOwnerAssessmentComponent', () => {
  let component: ChangeOwnerAssessmentComponent;
  let fixture: ComponentFixture<ChangeOwnerAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOwnerAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeOwnerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
