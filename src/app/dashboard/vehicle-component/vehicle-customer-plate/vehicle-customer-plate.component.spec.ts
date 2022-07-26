import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCustomerPlateComponent } from './vehicle-customer-plate.component';

describe('VehicleCustomerPlateComponent', () => {
  let component: VehicleCustomerPlateComponent;
  let fixture: ComponentFixture<VehicleCustomerPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCustomerPlateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCustomerPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
