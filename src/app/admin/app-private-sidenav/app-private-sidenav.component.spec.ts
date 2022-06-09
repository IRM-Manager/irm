import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPrivateSidenavComponent } from './app-private-sidenav.component';

describe('AppPrivateSidenavComponent', () => {
  let component: AppPrivateSidenavComponent;
  let fixture: ComponentFixture<AppPrivateSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPrivateSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPrivateSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
