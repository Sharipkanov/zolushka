import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegToDealogComponent } from './popup-reg-to-dealog.component';

describe('PopupRegToDealogComponent', () => {
  let component: PopupRegToDealogComponent;
  let fixture: ComponentFixture<PopupRegToDealogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRegToDealogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRegToDealogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
