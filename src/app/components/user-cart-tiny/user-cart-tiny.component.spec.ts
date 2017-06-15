import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartTinyComponent } from './user-cart-tiny.component';

describe('UserCartTinyComponent', () => {
  let component: UserCartTinyComponent;
  let fixture: ComponentFixture<UserCartTinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartTinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartTinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
