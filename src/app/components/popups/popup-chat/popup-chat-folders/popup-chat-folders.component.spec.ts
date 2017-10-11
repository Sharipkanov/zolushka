import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatFoldersComponent } from './popup-chat-folders.component';

describe('PopupChatFoldersComponent', () => {
  let component: PopupChatFoldersComponent;
  let fixture: ComponentFixture<PopupChatFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChatFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChatFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
