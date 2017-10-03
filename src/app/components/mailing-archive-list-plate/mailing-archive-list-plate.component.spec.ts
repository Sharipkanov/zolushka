import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingArchiveListPlateComponent } from './mailing-archive-list-plate.component';

describe('MailingArchiveListPlateComponent', () => {
  let component: MailingArchiveListPlateComponent;
  let fixture: ComponentFixture<MailingArchiveListPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingArchiveListPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingArchiveListPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
