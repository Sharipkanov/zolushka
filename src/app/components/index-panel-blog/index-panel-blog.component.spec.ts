import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelBlogComponent } from './index-panel-blog.component';

describe('IndexPanelBlogComponent', () => {
  let component: IndexPanelBlogComponent;
  let fixture: ComponentFixture<IndexPanelBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPanelBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
