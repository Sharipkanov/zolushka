import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadBoxComponent } from './download-box.component';

describe('DownloadBoxComponent', () => {
  let component: DownloadBoxComponent;
  let fixture: ComponentFixture<DownloadBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
