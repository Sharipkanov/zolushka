import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBlogItemComponent } from './page-blog-item.component';

describe('PageBlogItemComponent', () => {
  let component: PageBlogItemComponent;
  let fixture: ComponentFixture<PageBlogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBlogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBlogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
