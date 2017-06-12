import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioBoxLabelSeparateComponent } from './radio-box-label-separate.component';

describe('RadioBoxLabelSeparateComponent', () => {
  let component: RadioBoxLabelSeparateComponent;
  let fixture: ComponentFixture<RadioBoxLabelSeparateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioBoxLabelSeparateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBoxLabelSeparateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
