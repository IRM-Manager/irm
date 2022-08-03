import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingApplyComponent } from './witholding-apply.component';

describe('WitholdingApplyComponent', () => {
  let component: WitholdingApplyComponent;
  let fixture: ComponentFixture<WitholdingApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
