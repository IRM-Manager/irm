import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampSideNavListComponent } from './stamp-side-nav-list.component';

describe('StampSideNavListComponent', () => {
  let component: StampSideNavListComponent;
  let fixture: ComponentFixture<StampSideNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampSideNavListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampSideNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
