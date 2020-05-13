import { TestBed } from '@angular/core/testing';

import { IonloadingService } from './ionloading.service';

describe('IonloadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IonloadingService = TestBed.get(IonloadingService);
    expect(service).toBeTruthy();
  });
});
