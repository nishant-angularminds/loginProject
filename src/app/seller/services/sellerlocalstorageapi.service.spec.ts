import { TestBed } from '@angular/core/testing';

import { SellerlocalstorageapiService } from './sellerlocalstorageapi.service';

describe('SellerlocalstorageapiService', () => {
  let service: SellerlocalstorageapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerlocalstorageapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
