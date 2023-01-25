import { TestBed } from '@angular/core/testing';

import { SellershoppingInterceptor } from './sellershopping.interceptor';

describe('SellershoppingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SellershoppingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SellershoppingInterceptor = TestBed.inject(SellershoppingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
