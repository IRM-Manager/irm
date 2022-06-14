import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectBojComponent } from './direct-boj.component';

describe('DirectBojComponent', () => {
  let component: DirectBojComponent;
  let fixture: ComponentFixture<DirectBojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectBojComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectBojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
