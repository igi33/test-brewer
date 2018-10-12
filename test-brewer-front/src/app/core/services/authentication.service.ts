import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = false;
  private admin = false;
  private currentUser = null;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  initToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeAndSet(token);
    }
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/auth/login`, { username: username, password: password })
      .pipe(map(token => {
          // login successful if there's a jwt token in the response
          this.decodeAndSet(token);
          localStorage.setItem('token', token);
          return token;
      }));
  }

  decodeAndSet(token: string): void {
    this.loggedIn = true;
    this.currentUser = jwt_decode(token);
    this.admin = !!this.currentUser.isadmin; // boolean convert
  }

  logout() {
    // remove user from local storage to log user out
    this.loggedIn = false;
    this.currentUser = null;
    this.admin = false;
    localStorage.removeItem('token');
  }
}
