import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtCardComponent } from './debt-card.component';

describe('DebtCardComponent', () => {
  let component: DebtCardComponent;
  let fixture: ComponentFixture<DebtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
