import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRenewEditComponent } from './vehicle-renew-edit.component';

describe('VehicleRenewEditComponent', () => {
  let component: VehicleRenewEditComponent;
  let fixture: ComponentFixture<VehicleRenewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRenewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRenewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
