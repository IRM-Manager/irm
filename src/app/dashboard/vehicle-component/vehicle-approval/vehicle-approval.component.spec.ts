import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleApprovalComponent } from './vehicle-approval.component';

describe('VehicleApprovalComponent', () => {
  let component: VehicleApprovalComponent;
  let fixture: ComponentFixture<VehicleApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
