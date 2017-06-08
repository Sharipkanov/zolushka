import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsCircleListComponent } from './socials-circle-list.component';

describe('SocialsCircleListComponent', () => {
  let component: SocialsCircleListComponent;
  let fixture: ComponentFixture<SocialsCircleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialsCircleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialsCircleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
