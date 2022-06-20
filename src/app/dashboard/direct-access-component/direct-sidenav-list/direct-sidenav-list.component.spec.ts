import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectSidenavListComponent } from './direct-sidenav-list.component';

describe('DirectSidenavListComponent', () => {
  let component: DirectSidenavListComponent;
  let fixture: ComponentFixture<DirectSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
