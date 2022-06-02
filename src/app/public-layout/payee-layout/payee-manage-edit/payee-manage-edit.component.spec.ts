import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeManageEditComponent } from './payee-manage-edit.component';

describe('PayeeManageEditComponent', () => {
  let component: PayeeManageEditComponent;
  let fixture: ComponentFixture<PayeeManageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeManageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
