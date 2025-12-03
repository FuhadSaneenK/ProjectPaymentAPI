import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private baseUrl = 'https://localhost:7218/api/Account';

  constructor(private http: HttpClient) {}

  getTransactionsByAccount(accountId: number, pageNumber = 1, pageSize = 20) {
    return this.http.get(`${this.baseUrl}/${accountId}/transactions`, {
      params: { pageNumber, pageSize }
    });
  }
}
