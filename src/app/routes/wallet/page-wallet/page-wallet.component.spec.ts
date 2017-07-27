import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWalletComponent } from './page-wallet.component';

describe('PageWalletComponent', () => {
  let component: PageWalletComponent;
  let fixture: ComponentFixture<PageWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
