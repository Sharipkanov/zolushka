import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecboxBoxLabelComponent } from './checbox-box-label.component';

describe('ChecboxBoxLabelComponent', () => {
  let component: ChecboxBoxLabelComponent;
  let fixture: ComponentFixture<ChecboxBoxLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecboxBoxLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecboxBoxLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
