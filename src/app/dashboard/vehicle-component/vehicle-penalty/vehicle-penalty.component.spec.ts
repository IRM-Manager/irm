import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePenaltyComponent } from './vehicle-penalty.component';

describe('VehiclePenaltyComponent', () => {
  let component: VehiclePenaltyComponent;
  let fixture: ComponentFixture<VehiclePenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclePenaltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclePenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
