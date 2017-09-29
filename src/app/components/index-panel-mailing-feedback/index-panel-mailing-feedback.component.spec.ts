import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelMailingFeedbackComponent } from './index-panel-mailing-feedback.component';

describe('IndexPanelMailingFeedbackComponent', () => {
  let component: IndexPanelMailingFeedbackComponent;
  let fixture: ComponentFixture<IndexPanelMailingFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPanelMailingFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelMailingFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
