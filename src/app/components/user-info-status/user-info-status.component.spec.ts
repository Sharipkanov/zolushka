import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoStatusComponent } from './user-info-status.component';

describe('UserInfoStatusComponent', () => {
  let component: UserInfoStatusComponent;
  let fixture: ComponentFixture<UserInfoStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
