import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCreateComponent } from './self-create.component';

describe('SelfCreateComponent', () => {
  let component: SelfCreateComponent;
  let fixture: ComponentFixture<SelfCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
