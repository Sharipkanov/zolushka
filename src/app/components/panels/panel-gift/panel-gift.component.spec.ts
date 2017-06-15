import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGiftComponent } from './panel-gift.component';

describe('PanelGiftComponent', () => {
  let component: PanelGiftComponent;
  let fixture: ComponentFixture<PanelGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
