import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerDialogComponent } from './taxpayer-dialog.component';

describe('TaxpayerDialogComponent', () => {
  let component: TaxpayerDialogComponent;
  let fixture: ComponentFixture<TaxpayerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxpayerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
