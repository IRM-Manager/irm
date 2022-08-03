import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingViewComponent } from './witholding-view.component';

describe('WitholdingViewComponent', () => {
  let component: WitholdingViewComponent;
  let fixture: ComponentFixture<WitholdingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
