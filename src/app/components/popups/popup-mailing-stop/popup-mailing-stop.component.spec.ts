import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMailingStopComponent } from './popup-mailing-stop.component';

describe('PopupMailingStopComponent', () => {
  let component: PopupMailingStopComponent;
  let fixture: ComponentFixture<PopupMailingStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMailingStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMailingStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
