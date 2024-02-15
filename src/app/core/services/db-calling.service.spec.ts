import { TestBed } from '@angular/core/testing';

import { DbCallingService } from './db-calling.service';

describe('DbCallingService', () => {
  let service: DbCallingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbCallingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
