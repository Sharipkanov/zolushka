import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNewGirlsComponent } from './section-new-girls.component';

describe('SectionNewGirlsComponent', () => {
  let component: SectionNewGirlsComponent;
  let fixture: ComponentFixture<SectionNewGirlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionNewGirlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNewGirlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
