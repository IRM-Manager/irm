import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBillsComponent } from './vehicle-bills.component';

describe('VehicleBillsComponent', () => {
  let component: VehicleBillsComponent;
  let fixture: ComponentFixture<VehicleBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
