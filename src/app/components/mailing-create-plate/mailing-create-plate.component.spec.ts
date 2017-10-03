import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingCreatePlateComponent } from './mailing-create-plate.component';

describe('MailingCreatePlateComponent', () => {
  let component: MailingCreatePlateComponent;
  let fixture: ComponentFixture<MailingCreatePlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingCreatePlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingCreatePlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
