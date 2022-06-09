import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeManageEmployeeComponent } from './payee-manage-employee.component';

describe('PayeeManageEmployeeComponent', () => {
  let component: PayeeManageEmployeeComponent;
  let fixture: ComponentFixture<PayeeManageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeManageEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeManageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
