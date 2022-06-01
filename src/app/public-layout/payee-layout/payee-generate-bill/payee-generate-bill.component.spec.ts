import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeGenerateBillComponent } from './payee-generate-bill.component';

describe('PayeeGenerateBillComponent', () => {
  let component: PayeeGenerateBillComponent;
  let fixture: ComponentFixture<PayeeGenerateBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeGenerateBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeGenerateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
