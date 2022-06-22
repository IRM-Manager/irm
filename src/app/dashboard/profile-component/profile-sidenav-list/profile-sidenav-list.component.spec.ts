import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSidenavListComponent } from './profile-sidenav-list.component';

describe('ProfileSidenavListComponent', () => {
  let component: ProfileSidenavListComponent;
  let fixture: ComponentFixture<ProfileSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
