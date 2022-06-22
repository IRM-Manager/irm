import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsoleDialogComponent } from './admin-console-dialog.component';

describe('AdminConsoleDialogComponent', () => {
  let component: AdminConsoleDialogComponent;
  let fixture: ComponentFixture<AdminConsoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConsoleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
