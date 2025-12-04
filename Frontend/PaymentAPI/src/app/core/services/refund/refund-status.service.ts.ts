import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefundStatusService {

  private baseUrl = "https://localhost:7218/api/Admin/refund-requests";

  constructor(private http: HttpClient) {}

  // ⭐ GET all pending refund requests
  getPendingRefunds() {
    return this.http.get(`${this.baseUrl}/pending`);
  }

  // ⭐ APPROVE refund request
  approveRefund(refundRequestId: number, adminUserId: number, comments: string) {
    return this.http.post(`${this.baseUrl}/approve`, {
      refundRequestId,
      adminUserId,
      comments
    });
  }

  // ⭐ REJECT refund request
  rejectRefund(refundRequestId: number, adminUserId: number, reason: string) {
    return this.http.post(`${this.baseUrl}/reject`, {
      refundRequestId,
      adminUserId,
      reason
    });
  }
}
