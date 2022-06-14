import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectBillComponent } from './direct-bill.component';

describe('DirectBillComponent', () => {
  let component: DirectBillComponent;
  let fixture: ComponentFixture<DirectBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
