import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BojCreateComponent } from './boj-create.component';

describe('BojCreateComponent', () => {
  let component: BojCreateComponent;
  let fixture: ComponentFixture<BojCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BojCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BojCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
