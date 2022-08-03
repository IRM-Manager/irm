import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingDialogComponent } from './witholding-dialog.component';

describe('WitholdingDialogComponent', () => {
  let component: WitholdingDialogComponent;
  let fixture: ComponentFixture<WitholdingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
