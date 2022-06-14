import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectSelfComponent } from './direct-self.component';

describe('DirectSelfComponent', () => {
  let component: DirectSelfComponent;
  let fixture: ComponentFixture<DirectSelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectSelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
