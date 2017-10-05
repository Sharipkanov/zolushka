import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMailingEditComponent } from './page-mailing-edit.component';

describe('PageMailingEditComponent', () => {
  let component: PageMailingEditComponent;
  let fixture: ComponentFixture<PageMailingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMailingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMailingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
