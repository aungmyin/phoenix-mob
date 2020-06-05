import { TestBed } from '@angular/core/testing';

import { WorkreportSearchService } from './workreport-search.service';

describe('WorkreportSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkreportSearchService = TestBed.get(WorkreportSearchService);
    expect(service).toBeTruthy();
  });
});
