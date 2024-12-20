import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  getCustomerPortal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customer/portal`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  updateCustomer(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/customers`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  getRecentStores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/v1/recentStores`);
  }

  getAllStoreDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/v1/allStoreDetails`);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/customers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: { id },
    });
  }
}
