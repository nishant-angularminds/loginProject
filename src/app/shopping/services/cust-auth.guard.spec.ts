import { TestBed } from '@angular/core/testing';

import { CustAuthGuard } from './cust-auth.guard';

describe('CustAuthGuard', () => {
  let guard: CustAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
