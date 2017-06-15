import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTopUsersComponent } from './panel-top-users.component';

describe('PanelTopUsersComponent', () => {
  let component: PanelTopUsersComponent;
  let fixture: ComponentFixture<PanelTopUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTopUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTopUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
