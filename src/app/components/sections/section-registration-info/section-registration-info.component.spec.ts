import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRegistrationInfoComponent } from './section-registration-info.component';

describe('SectionRegistrationInfoComponent', () => {
  let component: SectionRegistrationInfoComponent;
  let fixture: ComponentFixture<SectionRegistrationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionRegistrationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionRegistrationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
