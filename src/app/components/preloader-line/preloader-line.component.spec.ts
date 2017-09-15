import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderLineComponent } from './preloader-line.component';

describe('PreloaderLineComponent', () => {
  let component: PreloaderLineComponent;
  let fixture: ComponentFixture<PreloaderLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloaderLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
