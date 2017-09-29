import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMailingBlacklistComponent } from './popup-mailing-blacklist.component';

describe('PopupMailingBlacklistComponent', () => {
  let component: PopupMailingBlacklistComponent;
  let fixture: ComponentFixture<PopupMailingBlacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMailingBlacklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMailingBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
