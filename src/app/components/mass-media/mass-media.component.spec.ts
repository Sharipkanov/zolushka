import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassMediaComponent } from './mass-media.component';

describe('MassMediaComponent', () => {
  let component: MassMediaComponent;
  let fixture: ComponentFixture<MassMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
