import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStoreLinkComponent } from './section-store-link.component';

describe('SectionStoreLinkComponent', () => {
  let component: SectionStoreLinkComponent;
  let fixture: ComponentFixture<SectionStoreLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionStoreLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStoreLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
