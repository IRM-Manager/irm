import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOnboardComponent } from './vehicle-onboard.component';

describe('VehicleOnboardComponent', () => {
  let component: VehicleOnboardComponent;
  let fixture: ComponentFixture<VehicleOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleOnboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
