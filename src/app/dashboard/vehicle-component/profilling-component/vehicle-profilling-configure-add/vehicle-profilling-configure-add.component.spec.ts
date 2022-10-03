import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleProfillingConfigureAddComponent } from './vehicle-profilling-configure-add.component';

describe('VehicleProfillingConfigureAddComponent', () => {
  let component: VehicleProfillingConfigureAddComponent;
  let fixture: ComponentFixture<VehicleProfillingConfigureAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleProfillingConfigureAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleProfillingConfigureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
