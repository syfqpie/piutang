import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDebtComponent } from './add-new-debt.component';

describe('AddNewDebtComponent', () => {
  let component: AddNewDebtComponent;
  let fixture: ComponentFixture<AddNewDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
