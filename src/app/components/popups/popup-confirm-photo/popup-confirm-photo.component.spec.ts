import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmPhotoComponent } from './popup-confirm-photo.component';

describe('PopupConfirmPhotoComponent', () => {
  let component: PopupConfirmPhotoComponent;
  let fixture: ComponentFixture<PopupConfirmPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupConfirmPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupConfirmPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
