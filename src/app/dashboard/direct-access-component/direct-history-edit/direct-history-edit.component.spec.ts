import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectHistoryEditComponent } from './direct-history-edit.component';

describe('DirectHistoryEditComponent', () => {
  let component: DirectHistoryEditComponent;
  let fixture: ComponentFixture<DirectHistoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectHistoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectHistoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
