import { TestBed } from '@angular/core/testing';

import { CustomerWorkreportInfoService } from './customer-workreport-info.service';

describe('CustomerWorkreportInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerWorkreportInfoService = TestBed.get(CustomerWorkreportInfoService);
    expect(service).toBeTruthy();
  });
});
