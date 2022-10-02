import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOwnerDetailsComponent } from './change-owner-details.component';

describe('ChangeOwnerDetailsComponent', () => {
  let component: ChangeOwnerDetailsComponent;
  let fixture: ComponentFixture<ChangeOwnerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOwnerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeOwnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
