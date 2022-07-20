import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNewRegPlateComponent } from './vehicle-new-reg-plate.component';

describe('VehicleNewRegPlateComponent', () => {
  let component: VehicleNewRegPlateComponent;
  let fixture: ComponentFixture<VehicleNewRegPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleNewRegPlateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleNewRegPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
