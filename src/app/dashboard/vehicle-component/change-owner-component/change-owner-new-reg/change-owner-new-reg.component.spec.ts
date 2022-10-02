import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOwnerNewRegComponent } from './change-owner-new-reg.component';

describe('ChangeOwnerNewRegComponent', () => {
  let component: ChangeOwnerNewRegComponent;
  let fixture: ComponentFixture<ChangeOwnerNewRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOwnerNewRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeOwnerNewRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
