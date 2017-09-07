import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegBeforeFilterByOnlineComponent } from './popup-reg-before-filter-by-online.component';

describe('PopupRegBeforeFilterByOnlineComponent', () => {
  let component: PopupRegBeforeFilterByOnlineComponent;
  let fixture: ComponentFixture<PopupRegBeforeFilterByOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRegBeforeFilterByOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRegBeforeFilterByOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
