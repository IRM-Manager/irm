import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeOverview2Component } from './payee-overview2.component';

describe('PayeeOverview2Component', () => {
  let component: PayeeOverview2Component;
  let fixture: ComponentFixture<PayeeOverview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeOverview2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeOverview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
