import { TestBed } from '@angular/core/testing';

import { UnitModulesService } from './unit-modules.service';

describe('UnitModulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitModulesService = TestBed.get(UnitModulesService);
    expect(service).toBeTruthy();
  });
});
