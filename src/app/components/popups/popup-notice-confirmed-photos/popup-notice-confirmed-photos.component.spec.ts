import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNoticeConfirmedPhotosComponent } from './popup-notice-confirmed-photos.component';

describe('PopupNoticeConfirmedPhotosComponent', () => {
  let component: PopupNoticeConfirmedPhotosComponent;
  let fixture: ComponentFixture<PopupNoticeConfirmedPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNoticeConfirmedPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNoticeConfirmedPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
