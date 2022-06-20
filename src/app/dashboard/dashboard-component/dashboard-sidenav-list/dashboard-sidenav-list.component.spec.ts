import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidenavListComponent } from './dashboard-sidenav-list.component';

describe('DashboardSidenavListComponent', () => {
  let component: DashboardSidenavListComponent;
  let fixture: ComponentFixture<DashboardSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
