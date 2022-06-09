import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeOverview3Component } from './payee-overview3.component';

describe('PayeeOverview3Component', () => {
  let component: PayeeOverview3Component;
  let fixture: ComponentFixture<PayeeOverview3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeOverview3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeOverview3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
