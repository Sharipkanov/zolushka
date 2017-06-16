import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPopularUsersComponent } from './section-popular-users.component';

describe('SectionPopularUsersComponent', () => {
  let component: SectionPopularUsersComponent;
  let fixture: ComponentFixture<SectionPopularUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPopularUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPopularUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
