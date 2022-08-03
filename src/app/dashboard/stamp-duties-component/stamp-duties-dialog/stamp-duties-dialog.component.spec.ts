import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDutiesDialogComponent } from './stamp-duties-dialog.component';

describe('StampDutiesDialogComponent', () => {
  let component: StampDutiesDialogComponent;
  let fixture: ComponentFixture<StampDutiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampDutiesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampDutiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
