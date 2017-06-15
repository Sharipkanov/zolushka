import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartThumbnailComponent } from './user-cart-thumbnail.component';

describe('UserCartThumbnailComponent', () => {
  let component: UserCartThumbnailComponent;
  let fixture: ComponentFixture<UserCartThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
