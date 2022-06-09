import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxIncomeComponent } from './tax-income.component';

describe('TaxIncomeComponent', () => {
  let component: TaxIncomeComponent;
  let fixture: ComponentFixture<TaxIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
