import { TestBed } from '@angular/core/testing';

import { WorkreportInfoService } from './workreport-info.service';

describe('WorkreportInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkreportInfoService = TestBed.get(WorkreportInfoService);
    expect(service).toBeTruthy();
  });
});
