import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInstallAppComponent } from './main-install-app.component';

describe('MainInstallAppComponent', () => {
  let component: MainInstallAppComponent;
  let fixture: ComponentFixture<MainInstallAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainInstallAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInstallAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
