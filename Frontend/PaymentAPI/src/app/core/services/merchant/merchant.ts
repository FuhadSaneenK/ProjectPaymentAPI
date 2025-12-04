import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Merchant {
  id: number;
  name: string;
  email: string;
}

export interface CreateMerchantRequest {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private baseUrl = 'https://localhost:7218/api/Merchant';

  constructor(private http: HttpClient) {}

  // -------------------------
  // CREATE MERCHANT (POST)
  // -------------------------
  createMerchant(data: CreateMerchantRequest): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // -------------------------
  // GET ALL MERCHANTS (GET)
  // -------------------------
  getMerchants(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // -------------------------
  // GET MERCHANT BY ID (GET)
  // -------------------------
  getMerchantById(id: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${this.baseUrl}/${id}`);
  }

  // -------------------------
  // ✅ NEW — GET MERCHANT SUMMARY (GET)
  // /api/Merchant/{id}/summary
  // -------------------------
  getMerchantSummary(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/summary`);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Merchant {
//   id: number;
//   name: string;
//   email: string;
// }

// export interface CreateMerchantRequest {
//   name: string;
//   email: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class MerchantService {
//   private baseUrl = 'https://localhost:7218/api/Merchant';

//   constructor(private http: HttpClient) {}

//   createMerchant(data: CreateMerchantRequest): Observable<any> {
//     return this.http.post(this.baseUrl, data);
//   }

//   getMerchants(): Observable<Merchant[]> {
//     return this.http.get<Merchant[]>(this.baseUrl);
//   }

//   getMerchantById(id: number): Observable<Merchant> {
//     return this.http.get<Merchant>(`${this.baseUrl}/${id}`);
//   }
// }
