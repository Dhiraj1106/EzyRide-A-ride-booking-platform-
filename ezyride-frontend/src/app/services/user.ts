import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number) {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  updateUser(id: number, user: any) {
    return this.http.put<any>(this.apiUrl + '/' + id, user);
  }
}
