import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDutiesApplyComponent } from './stamp-duties-apply.component';

describe('StampDutiesApplyComponent', () => {
  let component: StampDutiesApplyComponent;
  let fixture: ComponentFixture<StampDutiesApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampDutiesApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampDutiesApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
