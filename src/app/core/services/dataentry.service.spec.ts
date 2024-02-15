import { TestBed } from '@angular/core/testing';

import { DataentryService } from './dataentry.service';

describe('DataentryService', () => {
  let service: DataentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
