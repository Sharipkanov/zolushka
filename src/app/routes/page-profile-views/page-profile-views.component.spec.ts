import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfileViewsComponent } from './page-profile-views.component';

describe('PageProfileViewsComponent', () => {
  let component: PageProfileViewsComponent;
  let fixture: ComponentFixture<PageProfileViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProfileViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProfileViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
