import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatDialogHeaderComponent } from './popup-chat-dialog-header.component';

describe('PopupChatDialogHeaderComponent', () => {
  let component: PopupChatDialogHeaderComponent;
  let fixture: ComponentFixture<PopupChatDialogHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChatDialogHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChatDialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
