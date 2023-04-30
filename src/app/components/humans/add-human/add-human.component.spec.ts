import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHumanComponent } from './add-human.component';

describe('AddHumanComponent', () => {
  let component: AddHumanComponent;
  let fixture: ComponentFixture<AddHumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHumanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
