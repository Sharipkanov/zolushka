import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegBeforeFilterByRealPhotoComponent } from './popup-reg-before-filter-by-real-photo.component';

describe('PopupRegBeforeFilterByRealPhotoComponent', () => {
  let component: PopupRegBeforeFilterByRealPhotoComponent;
  let fixture: ComponentFixture<PopupRegBeforeFilterByRealPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRegBeforeFilterByRealPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRegBeforeFilterByRealPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
