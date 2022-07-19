import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOffenceComponent } from './vehicle-offence.component';

describe('VehicleOffenceComponent', () => {
  let component: VehicleOffenceComponent;
  let fixture: ComponentFixture<VehicleOffenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleOffenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleOffenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
