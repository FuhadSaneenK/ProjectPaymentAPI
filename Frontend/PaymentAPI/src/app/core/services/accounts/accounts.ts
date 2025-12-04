import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAccountData } from '../../../features/Merchant/create-account-modal/create-account-modal';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private baseUrl = 'https://localhost:7218/api/Merchant';

  constructor(private http: HttpClient) {}

  getAccountsByMerchant(merchantId: number, pageNumber = 1, pageSize = 20) {
    return this.http.get(`${this.baseUrl}/${merchantId}/accounts`, {
      params: {
        pageNumber,
        pageSize
      }
    });
  }

    // Create Account API
  createAccount(data: CreateAccountData) {
    return this.http.post(`https://localhost:7218/api/Account`, data);
  }
}
