import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecboxBoxComponent } from './checbox-box.component';

describe('ChecboxBoxComponent', () => {
  let component: ChecboxBoxComponent;
  let fixture: ComponentFixture<ChecboxBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecboxBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecboxBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
