import { TestBed } from '@angular/core/testing';

import { NavigationurlService } from './navigationurl.service';

describe('NavigationurlService', () => {
  let service: NavigationurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
