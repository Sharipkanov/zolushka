import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioBoxLabelComponent } from './radio-box-label.component';

describe('RadioBoxLabelComponent', () => {
  let component: RadioBoxLabelComponent;
  let fixture: ComponentFixture<RadioBoxLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioBoxLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBoxLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
