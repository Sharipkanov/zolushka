import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSearchBoxComponent } from './select-search-box.component';

describe('SelectSearchBoxComponent', () => {
  let component: SelectSearchBoxComponent;
  let fixture: ComponentFixture<SelectSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
