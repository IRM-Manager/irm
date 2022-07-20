import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNewRegComponent } from './vehicle-new-reg.component';

describe('VehicleNewRegComponent', () => {
  let component: VehicleNewRegComponent;
  let fixture: ComponentFixture<VehicleNewRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleNewRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleNewRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
