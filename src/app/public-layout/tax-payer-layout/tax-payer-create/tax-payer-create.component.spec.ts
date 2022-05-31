import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPayerCreateComponent } from './tax-payer-create.component';

describe('TaxPayerCreateComponent', () => {
  let component: TaxPayerCreateComponent;
  let fixture: ComponentFixture<TaxPayerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxPayerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPayerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
