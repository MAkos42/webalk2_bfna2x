import { TestBed } from '@angular/core/testing';

import { TripsProxyService } from './trips-proxy.service';

describe('TripsProxyService', () => {
  let service: TripsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
