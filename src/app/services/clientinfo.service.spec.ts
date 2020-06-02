import { TestBed } from '@angular/core/testing';

import { ClientinfoService } from './clientinfo.service';

describe('ClientinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientinfoService = TestBed.get(ClientinfoService);
    expect(service).toBeTruthy();
  });
});
