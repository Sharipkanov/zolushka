import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatComponent } from './popup-chat.component';

describe('PopupChatComponent', () => {
  let component: PopupChatComponent;
  let fixture: ComponentFixture<PopupChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
