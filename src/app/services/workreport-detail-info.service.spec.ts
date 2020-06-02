import { TestBed } from '@angular/core/testing';

import { WorkreportDetailInfoService } from './workreport-detail-info.service';

describe('WorkreportDetailInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkreportDetailInfoService = TestBed.get(WorkreportDetailInfoService);
    expect(service).toBeTruthy();
  });
});
