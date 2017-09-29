import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelChatListComponent } from './index-panel-chat-list.component';

describe('IndexPanelChatListComponent', () => {
  let component: IndexPanelChatListComponent;
  let fixture: ComponentFixture<IndexPanelChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPanelChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
