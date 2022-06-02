import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeViewComponent } from './payee-view.component';

describe('PayeeViewComponent', () => {
  let component: PayeeViewComponent;
  let fixture: ComponentFixture<PayeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
