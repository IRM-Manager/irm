import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeBillsComponent } from './payee-bills.component';

describe('PayeeBillsComponent', () => {
  let component: PayeeBillsComponent;
  let fixture: ComponentFixture<PayeeBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
