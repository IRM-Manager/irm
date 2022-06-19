import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegAssessmentComponent } from './vehicle-reg-assessment.component';

describe('VehicleRegAssessmentComponent', () => {
  let component: VehicleRegAssessmentComponent;
  let fixture: ComponentFixture<VehicleRegAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRegAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
