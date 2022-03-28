import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDAComponent } from './mda.component';

describe('MDAComponent', () => {
  let component: MDAComponent;
  let fixture: ComponentFixture<MDAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MDAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
