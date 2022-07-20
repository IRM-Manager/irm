import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNewRegDetailsComponent } from './vehicle-new-reg-details.component';

describe('VehicleNewRegDetailsComponent', () => {
  let component: VehicleNewRegDetailsComponent;
  let fixture: ComponentFixture<VehicleNewRegDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleNewRegDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleNewRegDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
