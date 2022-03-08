import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Individual2Component } from './individual2.component';

describe('Individual2Component', () => {
  let component: Individual2Component;
  let fixture: ComponentFixture<Individual2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Individual2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Individual2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
