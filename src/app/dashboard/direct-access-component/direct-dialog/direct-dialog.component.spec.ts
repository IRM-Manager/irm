import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDialogComponent } from './direct-dialog.component';

describe('DirectDialogComponent', () => {
  let component: DirectDialogComponent;
  let fixture: ComponentFixture<DirectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
