import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectHistoryViewEditComponent } from './direct-history-view-edit.component';

describe('DirectHistoryViewEditComponent', () => {
  let component: DirectHistoryViewEditComponent;
  let fixture: ComponentFixture<DirectHistoryViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectHistoryViewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectHistoryViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
