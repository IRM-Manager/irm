import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNewRegAssessmentComponent } from './vehicle-new-reg-assessment.component';

describe('VehicleNewRegAssessmentComponent', () => {
  let component: VehicleNewRegAssessmentComponent;
  let fixture: ComponentFixture<VehicleNewRegAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleNewRegAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleNewRegAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
