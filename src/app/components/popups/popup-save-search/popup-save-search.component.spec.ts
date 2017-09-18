import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSaveSearchComponent } from './popup-save-search.component';

describe('PopupSaveSearchComponent', () => {
  let component: PopupSaveSearchComponent;
  let fixture: ComponentFixture<PopupSaveSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSaveSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSaveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
