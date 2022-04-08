import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransBillsComponent } from './trans-bills.component';

describe('TransBillsComponent', () => {
  let component: TransBillsComponent;
  let fixture: ComponentFixture<TransBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
