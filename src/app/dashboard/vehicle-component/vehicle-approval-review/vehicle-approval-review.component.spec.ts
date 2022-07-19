import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleApprovalReviewComponent } from './vehicle-approval-review.component';

describe('VehicleApprovalReviewComponent', () => {
  let component: VehicleApprovalReviewComponent;
  let fixture: ComponentFixture<VehicleApprovalReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleApprovalReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleApprovalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
