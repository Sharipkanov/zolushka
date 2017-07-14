import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfileEditComponent } from './page-profile-edit.component';

describe('PageProfileEditComponent', () => {
  let component: PageProfileEditComponent;
  let fixture: ComponentFixture<PageProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
