import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleProfillingConfigureTableComponent } from './vehicle-profilling-configure-table.component';

describe('VehicleProfillingConfigureTableComponent', () => {
  let component: VehicleProfillingConfigureTableComponent;
  let fixture: ComponentFixture<VehicleProfillingConfigureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleProfillingConfigureTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleProfillingConfigureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
