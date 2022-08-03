import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDutiesTableComponent } from './stamp-duties-table.component';

describe('StampDutiesTableComponent', () => {
  let component: StampDutiesTableComponent;
  let fixture: ComponentFixture<StampDutiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampDutiesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampDutiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
