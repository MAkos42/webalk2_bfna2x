import { TestBed } from '@angular/core/testing';

import { VehiclesProxyService } from './vehicles-proxy.service';

describe('BackendProxyService', () => {
  let service: VehiclesProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
