import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelDayPersonComponent } from './index-panel-day-person.component';

describe('IndexPanelDayPersonComponent', () => {
  let component: IndexPanelDayPersonComponent;
  let fixture: ComponentFixture<IndexPanelDayPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPanelDayPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelDayPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
