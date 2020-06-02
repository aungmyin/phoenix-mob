import { TestBed } from '@angular/core/testing';

import { TransportationExpenseService } from './transportation-expense.service';

describe('TransportationExpenseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportationExpenseService = TestBed.get(TransportationExpenseService);
    expect(service).toBeTruthy();
  });
});
