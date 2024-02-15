import { TestBed } from '@angular/core/testing';

import { AssetinstanceService } from './assetinstance.service';

describe('AssetinstanceService', () => {
  let service: AssetinstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetinstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
