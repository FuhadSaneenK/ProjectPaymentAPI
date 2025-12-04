import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentData } from '../../../features/Merchant/payment-modal/payment-modal';
import { RefundData } from '../../../features/Merchant/refund-modal/refund-modal';

@Injectable({
  providedIn: 'root'
})
export class PayRefundService {

  private baseUrl = 'https://localhost:7218/api/Transaction';

  constructor(private http: HttpClient) {}

  // ⭐ PAYMENT API
  makePayment(data: PaymentData) {
    return this.http.post(`${this.baseUrl}/payment`, data);
  }

  // ⭐ REFUND API (we will fill later)
    makeRefund(data: RefundData) {
      return this.http.post(`${this.baseUrl}/refund`, {
        amount: Number(data.amount),
        accountId: Number(data.accountId),
        referenceNo: data.referenceNo,
        reason: data.reason
      });
}
}
