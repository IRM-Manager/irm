import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerSidenavListComponent } from './taxpayer-sidenav-list.component';

describe('TaxpayerSidenavListComponent', () => {
  let component: TaxpayerSidenavListComponent;
  let fixture: ComponentFixture<TaxpayerSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxpayerSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
