import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdaOnboardComponent } from './mda-onboard.component';

describe('MdaOnboardComponent', () => {
  let component: MdaOnboardComponent;
  let fixture: ComponentFixture<MdaOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdaOnboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdaOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
