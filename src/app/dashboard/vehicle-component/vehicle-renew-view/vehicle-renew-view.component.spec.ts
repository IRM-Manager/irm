import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRenewViewComponent } from './vehicle-renew-view.component';

describe('VehicleRenewViewComponent', () => {
  let component: VehicleRenewViewComponent;
  let fixture: ComponentFixture<VehicleRenewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRenewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRenewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
