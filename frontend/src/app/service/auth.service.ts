import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; // import map operator


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // replace with your backend server URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string, userId: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        return response;
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
