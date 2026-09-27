import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoggedUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<LoggedUser | null>(this.readUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', user);
  }

  loginUser(user: any): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(this.apiUrl + '/login', user);
  }

  setLoggedUser(user: LoggedUser): void {
    const safeUser: LoggedUser = {
      id: Number(user.id),
      name: user.name || 'EzyRide User',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'USER'
    };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ezyrideUser', JSON.stringify(safeUser));
      localStorage.setItem('userId', String(safeUser.id));
      localStorage.setItem('userName', safeUser.name);
    }
    this.currentUserSubject.next(safeUser);
  }

  getCurrentUser(): LoggedUser | null {
    return this.currentUserSubject.value;
  }

  getUserId(): number | null {
    const user = this.getCurrentUser();
    const id = user?.id ?? Number(localStorage.getItem('userId'));
    return id && !Number.isNaN(id) ? id : null;
  }

  isLoggedIn(): boolean {
    return this.getUserId() !== null;
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('ezyrideUser');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
    this.currentUserSubject.next(null);
  }

  private readUser(): LoggedUser | null {
    try {
      if (typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem('ezyrideUser');
      if (raw) return JSON.parse(raw) as LoggedUser;
      const id = localStorage.getItem('userId');
      const name = localStorage.getItem('userName');
      if (id) return { id: Number(id), name: name || 'EzyRide User', email: '' };
    } catch {}
    return null;
  }
}
