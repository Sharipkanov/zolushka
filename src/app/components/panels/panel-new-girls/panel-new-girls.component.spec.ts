import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelNewGirlsComponent } from './panel-new-girls.component';

describe('PanelNewGirlsComponent', () => {
  let component: PanelNewGirlsComponent;
  let fixture: ComponentFixture<PanelNewGirlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelNewGirlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNewGirlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
