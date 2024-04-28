import { TestBed } from '@angular/core/testing';

import { MasticworkService } from './masticwork.service';

describe('MasticworkService', () => {
  let service: MasticworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasticworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
