import { TestBed } from '@angular/core/testing';

import { PayRefund } from './pay-refund';

describe('PayRefund', () => {
  let service: PayRefund;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayRefund);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
