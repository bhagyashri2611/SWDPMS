import { TestBed } from '@angular/core/testing';

import { PandmattributeService } from './pandmattribute.service';

describe('PandmattributeService', () => {
  let service: PandmattributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PandmattributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
