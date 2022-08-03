import { TestBed } from '@angular/core/testing';

import { WitholdingServiceService } from './witholding-service.service';

describe('WitholdingServiceService', () => {
  let service: WitholdingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WitholdingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
