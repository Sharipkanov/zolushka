import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingUserListCartComponent } from './mailing-user-list-cart.component';

describe('MailingUserListCartComponent', () => {
  let component: MailingUserListCartComponent;
  let fixture: ComponentFixture<MailingUserListCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingUserListCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingUserListCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
