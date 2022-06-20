import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdaSidenavListComponent } from './mda-sidenav-list.component';

describe('MdaSidenavListComponent', () => {
  let component: MdaSidenavListComponent;
  let fixture: ComponentFixture<MdaSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdaSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdaSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
