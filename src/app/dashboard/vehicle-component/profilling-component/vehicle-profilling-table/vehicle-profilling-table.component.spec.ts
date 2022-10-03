import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleProfillingTableComponent } from './vehicle-profilling-table.component';

describe('VehicleProfillingTableComponent', () => {
  let component: VehicleProfillingTableComponent;
  let fixture: ComponentFixture<VehicleProfillingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleProfillingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleProfillingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
