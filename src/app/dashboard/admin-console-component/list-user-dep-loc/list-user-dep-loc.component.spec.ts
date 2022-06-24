import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserDepLocComponent } from './list-user-dep-loc.component';

describe('ListUserDepLocComponent', () => {
  let component: ListUserDepLocComponent;
  let fixture: ComponentFixture<ListUserDepLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserDepLocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserDepLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
