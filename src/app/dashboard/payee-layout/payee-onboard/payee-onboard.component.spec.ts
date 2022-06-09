import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeOnboardComponent } from './payee-onboard.component';

describe('PayeeOnboardComponent', () => {
  let component: PayeeOnboardComponent;
  let fixture: ComponentFixture<PayeeOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeOnboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
