import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeManualInputComponent } from './payee-manual-input.component';

describe('PayeeManualInputComponent', () => {
  let component: PayeeManualInputComponent;
  let fixture: ComponentFixture<PayeeManualInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeManualInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeManualInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
