import { TestBed } from '@angular/core/testing';

import { MdaServiceService } from './mda-service.service';

describe('MdaServiceService', () => {
  let service: MdaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
