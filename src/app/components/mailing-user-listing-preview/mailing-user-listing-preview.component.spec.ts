import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingUserListingPreviewComponent } from './mailing-user-listing-preview.component';

describe('MailingUserListingPreviewComponent', () => {
  let component: MailingUserListingPreviewComponent;
  let fixture: ComponentFixture<MailingUserListingPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingUserListingPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingUserListingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
