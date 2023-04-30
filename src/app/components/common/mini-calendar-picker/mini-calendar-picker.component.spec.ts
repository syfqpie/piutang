import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCalendarPickerComponent } from './mini-calendar-picker.component';

describe('MiniCalendarPickerComponent', () => {
  let component: MiniCalendarPickerComponent;
  let fixture: ComponentFixture<MiniCalendarPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCalendarPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCalendarPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
