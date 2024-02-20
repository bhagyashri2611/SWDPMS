import { TestBed } from '@angular/core/testing';

import { AssetModulesService } from './asset-modules.service';

describe('AssetModulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetModulesService = TestBed.get(AssetModulesService);
    expect(service).toBeTruthy();
  });
});
