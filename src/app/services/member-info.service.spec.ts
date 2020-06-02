import { TestBed } from '@angular/core/testing';

import { MemberInfoService } from './member-info.service';

describe('MemberInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberInfoService = TestBed.get(MemberInfoService);
    expect(service).toBeTruthy();
  });
});
