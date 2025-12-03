import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  role: 'Admin' | 'User';
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7218/api/Auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  login(credentials: LoginRequest): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Full login response:', response);
          
          if (response && response.isSuccess && response.data) {
            const token = response.data;
            const decodedToken = this.decodeToken(token);
            
            console.log('Decoded token:', decodedToken);
            
            if (decodedToken) {
              // Extract role from the full claim name
              const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] 
                        || decodedToken.role 
                        || 'User';
              
              const user: User = {
                id: parseInt(decodedToken.id || decodedToken.nameid || decodedToken.sub),
                username: decodedToken.sub || decodedToken.unique_name || decodedToken.name,
                role: role,
                token: token
              };
              
              console.log('User object created:', user);
              
              this.setCurrentUser(user);
              this.navigateToDashboard(user.role);
            }
          }
        })
      );
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  signup(signupData: SignupRequest): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/register`, signupData)
      .pipe(
        tap(response => {
          if (response && response.isSuccess && response.data) {
            const token = response.data;
            const decodedToken = this.decodeToken(token);
            
            if (decodedToken) {
              // Extract role from the full claim name
              const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] 
                        || decodedToken.role 
                        || 'User';
              
              const user: User = {
                id: parseInt(decodedToken.id || decodedToken.nameid || decodedToken.sub),
                username: decodedToken.sub || decodedToken.unique_name || decodedToken.name,
                role: role,
                token: token
              };
              
              this.setCurrentUser(user);
              this.navigateToDashboard(user.role);
            }
          }
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setCurrentUser(user: User): void {
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  private navigateToDashboard(role: 'Admin' | 'User'): void {
    if (role === 'Admin') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/merchant/dashboard']);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? user.token || null : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'Admin';
  }

  isMerchant(): boolean {
    return this.getCurrentUser()?.role === 'User';
  }
}
