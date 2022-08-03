import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingTableComponentComponent } from './witholding-table-component.component';

describe('WitholdingTableComponentComponent', () => {
  let component: WitholdingTableComponentComponent;
  let fixture: ComponentFixture<WitholdingTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingTableComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
