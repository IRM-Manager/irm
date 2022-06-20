import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSidenavMenuComponent } from './bottom-sidenav-menu.component';

describe('BottomSidenavMenuComponent', () => {
  let component: BottomSidenavMenuComponent;
  let fixture: ComponentFixture<BottomSidenavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSidenavMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
