import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingCurrentActiveMailingComponent } from './mailing-current-active-mailing.component';

describe('MailingCurrentActiveMailingComponent', () => {
  let component: MailingCurrentActiveMailingComponent;
  let fixture: ComponentFixture<MailingCurrentActiveMailingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingCurrentActiveMailingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingCurrentActiveMailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
