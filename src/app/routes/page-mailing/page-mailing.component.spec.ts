import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMailingComponent } from './page-mailing.component';

describe('PageMailingComponent', () => {
  let component: PageMailingComponent;
  let fixture: ComponentFixture<PageMailingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMailingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
