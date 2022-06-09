import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPayerComponent } from './tax-payer.component';

describe('TaxPayerComponent', () => {
  let component: TaxPayerComponent;
  let fixture: ComponentFixture<TaxPayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxPayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
