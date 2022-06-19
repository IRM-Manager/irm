import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegComponent } from './vehicle-reg.component';

describe('VehicleRegComponent', () => {
  let component: VehicleRegComponent;
  let fixture: ComponentFixture<VehicleRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
