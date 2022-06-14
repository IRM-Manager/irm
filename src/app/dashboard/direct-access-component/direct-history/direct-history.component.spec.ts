import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectHistoryComponent } from './direct-history.component';

describe('DirectHistoryComponent', () => {
  let component: DirectHistoryComponent;
  let fixture: ComponentFixture<DirectHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
