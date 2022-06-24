import { TestBed } from '@angular/core/testing';

import { PayeeServiceService } from './payee-service.service';

describe('PayeeServiceService', () => {
  let service: PayeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
