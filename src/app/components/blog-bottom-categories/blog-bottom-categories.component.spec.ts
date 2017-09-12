import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBottomCategoriesComponent } from './blog-bottom-categories.component';

describe('BlogBottomCategoriesComponent', () => {
  let component: BlogBottomCategoriesComponent;
  let fixture: ComponentFixture<BlogBottomCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogBottomCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogBottomCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
