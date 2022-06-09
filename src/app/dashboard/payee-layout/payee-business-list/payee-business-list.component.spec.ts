import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeBusinessListComponent } from './payee-business-list.component';

describe('PayeeBusinessListComponent', () => {
  let component: PayeeBusinessListComponent;
  let fixture: ComponentFixture<PayeeBusinessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeBusinessListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeBusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
