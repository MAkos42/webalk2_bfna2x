import { TestBed } from '@angular/core/testing';

import { DriversProxyService } from './drivers-proxy.service';

describe('DriversProxyService', () => {
  let service: DriversProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriversProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
