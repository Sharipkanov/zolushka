import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelViewsComponent } from './index-panel-views.component';

describe('IndexPanelViewsComponent', () => {
  let component: IndexPanelViewsComponent;
  let fixture: ComponentFixture<IndexPanelViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPanelViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
