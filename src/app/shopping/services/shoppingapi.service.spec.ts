import { TestBed } from '@angular/core/testing';

import { ShoppingapiService } from './shoppingapi.service';

describe('ShoppingapiService', () => {
  let service: ShoppingapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
