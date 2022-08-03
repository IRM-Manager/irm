import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingSidenavListComponent } from './witholding-sidenav-list.component';

describe('WitholdingSidenavListComponent', () => {
  let component: WitholdingSidenavListComponent;
  let fixture: ComponentFixture<WitholdingSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingSidenavListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
