import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidenavListComponent } from './admin-sidenav-list.component';

describe('AdminSidenavListComponent', () => {
  let component: AdminSidenavListComponent;
  let fixture: ComponentFixture<AdminSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
