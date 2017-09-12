import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemCartComponent } from './blog-item-cart.component';

describe('BlogItemCartComponent', () => {
  let component: BlogItemCartComponent;
  let fixture: ComponentFixture<BlogItemCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogItemCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogItemCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
