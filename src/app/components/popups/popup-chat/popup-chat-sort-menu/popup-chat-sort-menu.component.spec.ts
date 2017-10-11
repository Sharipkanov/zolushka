import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatSortMenuComponent } from './popup-chat-sort-menu.component';

describe('PopupChatSortMenuComponent', () => {
  let component: PopupChatSortMenuComponent;
  let fixture: ComponentFixture<PopupChatSortMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChatSortMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChatSortMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
