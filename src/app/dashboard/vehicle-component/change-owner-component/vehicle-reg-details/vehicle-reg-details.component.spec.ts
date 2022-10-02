import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegDetailsComponent } from './vehicle-reg-details.component';

describe('VehicleRegDetailsComponent', () => {
  let component: VehicleRegDetailsComponent;
  let fixture: ComponentFixture<VehicleRegDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRegDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
