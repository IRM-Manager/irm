import { TestBed } from '@angular/core/testing';

import { StampServiceService } from './stamp-service.service';

describe('StampServiceService', () => {
  let service: StampServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StampServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
