import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredVehicleComponent } from './registered-vehicle.component';

describe('RegisteredVehicleComponent', () => {
  let component: RegisteredVehicleComponent;
  let fixture: ComponentFixture<RegisteredVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
