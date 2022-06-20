import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeSidenavListComponent } from './payee-sidenav-list.component';

describe('PayeeSidenavListComponent', () => {
  let component: PayeeSidenavListComponent;
  let fixture: ComponentFixture<PayeeSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeSidenavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
