import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeOverviewComponent } from './payee-overview.component';

describe('PayeeOverviewComponent', () => {
  let component: PayeeOverviewComponent;
  let fixture: ComponentFixture<PayeeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
