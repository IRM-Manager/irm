import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegPlateComponent } from './vehicle-reg-plate.component';

describe('VehicleRegPlateComponent', () => {
  let component: VehicleRegPlateComponent;
  let fixture: ComponentFixture<VehicleRegPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRegPlateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
