import { TestBed } from '@angular/core/testing';

import { SalaryHistoryCatalogService } from './salary-history-catalog.service';

describe('SalaryHistoryCatalogService', () => {
  let service: SalaryHistoryCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryHistoryCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
