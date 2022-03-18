import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffIncomeComponent } from './staff-income.component';

describe('StaffIncomeComponent', () => {
  let component: StaffIncomeComponent;
  let fixture: ComponentFixture<StaffIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
