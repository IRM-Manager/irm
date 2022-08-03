import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDutiesViewComponent } from './stamp-duties-view.component';

describe('StampDutiesViewComponent', () => {
  let component: StampDutiesViewComponent;
  let fixture: ComponentFixture<StampDutiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampDutiesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampDutiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
