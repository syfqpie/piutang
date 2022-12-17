import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBarMainComponent } from './tab-bar-main.component';

describe('TabBarMainComponent', () => {
  let component: TabBarMainComponent;
  let fixture: ComponentFixture<TabBarMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBarMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
