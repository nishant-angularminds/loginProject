import { TestBed } from '@angular/core/testing';

import { ShoppinglocalstorageService } from './shoppinglocalstorage.service';

describe('ShoppinglocalstorageService', () => {
  let service: ShoppinglocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppinglocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
