import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdaDialogComponent } from './mda-dialog.component';

describe('MdaDialogComponent', () => {
  let component: MdaDialogComponent;
  let fixture: ComponentFixture<MdaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
