import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomGridComponent } from './bottom-grid.component';

describe('BottomGridComponent', () => {
  let component: BottomGridComponent;
  let fixture: ComponentFixture<BottomGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
