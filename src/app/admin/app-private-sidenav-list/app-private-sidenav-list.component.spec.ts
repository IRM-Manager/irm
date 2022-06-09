import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPrivateSidenavListComponent } from './app-private-sidenav-list.component';

describe('AppPrivateSidenavListComponent', () => {
  let component: AppPrivateSidenavListComponent;
  let fixture: ComponentFixture<AppPrivateSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPrivateSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPrivateSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
