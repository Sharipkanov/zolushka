import { TestBed, inject } from '@angular/core/testing';

import { PopupsService } from './popups.service';

describe('PopupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupsService]
    });
  });

  it('should be created', inject([PopupsService], (service: PopupsService) => {
    expect(service).toBeTruthy();
  }));
});
