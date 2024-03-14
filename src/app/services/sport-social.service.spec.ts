import { TestBed } from '@angular/core/testing';

import { SportSocialService } from './sport-social.service';

describe('SportSocialService', () => {
  let service: SportSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportSocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
