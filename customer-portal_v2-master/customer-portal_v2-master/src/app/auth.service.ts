// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminLoginUrl = `${environment.apiUrl}/admin/login`;
  private customerLoginUrl = `${environment.apiUrl}/customer/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string, role: string): Observable<any> {
    const url = role === 'admin' ? this.adminLoginUrl : this.customerLoginUrl;
    return this.http.post<any>(url, { username, password });
  }

  setToken(token: string, role: string,customerName: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_role', role);
    localStorage.setItem('customerName',customerName)
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

getCustomerName(): string | null {
    return localStorage.getItem('customerName');
  }
  getRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('customerName');
    this.router.navigate(['/']);
  }
}
