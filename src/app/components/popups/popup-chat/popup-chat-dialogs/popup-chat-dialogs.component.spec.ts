import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatDialogsComponent } from './popup-chat-dialogs.component';

describe('PopupChatDialogsComponent', () => {
  let component: PopupChatDialogsComponent;
  let fixture: ComponentFixture<PopupChatDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChatDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChatDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
