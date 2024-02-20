import { TestBed } from '@angular/core/testing';

import { PandmattributegroupService } from './pandmattributegroup.service';

describe('PandmattributegroupService', () => {
  let service: PandmattributegroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PandmattributegroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
