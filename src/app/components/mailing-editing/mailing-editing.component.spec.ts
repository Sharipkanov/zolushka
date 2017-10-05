import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingEditingComponent } from './mailing-editing.component';

describe('MailingEditingComponent', () => {
  let component: MailingEditingComponent;
  let fixture: ComponentFixture<MailingEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
