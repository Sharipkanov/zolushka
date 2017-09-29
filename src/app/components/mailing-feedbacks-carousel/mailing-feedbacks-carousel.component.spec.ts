import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingFeedbacksCarouselComponent } from './mailing-feedbacks-carousel.component';

describe('MailingFeedbacksCarouselComponent', () => {
  let component: MailingFeedbacksCarouselComponent;
  let fixture: ComponentFixture<MailingFeedbacksCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingFeedbacksCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingFeedbacksCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
