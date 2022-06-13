import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdaTableComponent } from './mda-table.component';

describe('MdaTableComponent', () => {
  let component: MdaTableComponent;
  let fixture: ComponentFixture<MdaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
