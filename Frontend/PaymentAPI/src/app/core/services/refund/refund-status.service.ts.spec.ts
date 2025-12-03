import { TestBed } from '@angular/core/testing';
import { RefundStatusService } from './refund-status.service.ts';



describe('RefundStatusServiceTs', () => {
  let service: RefundStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
