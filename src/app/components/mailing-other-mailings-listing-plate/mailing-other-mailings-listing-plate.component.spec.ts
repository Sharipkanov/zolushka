import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingOtherMailingsListingPlateComponent } from './mailing-other-mailings-listing-plate.component';

describe('MailingOtherMailingsListingPlateComponent', () => {
  let component: MailingOtherMailingsListingPlateComponent;
  let fixture: ComponentFixture<MailingOtherMailingsListingPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingOtherMailingsListingPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingOtherMailingsListingPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
