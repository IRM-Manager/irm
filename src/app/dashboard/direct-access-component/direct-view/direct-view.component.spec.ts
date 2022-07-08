import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectViewComponent } from './direct-view.component';

describe('DirectViewComponent', () => {
  let component: DirectViewComponent;
  let fixture: ComponentFixture<DirectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
