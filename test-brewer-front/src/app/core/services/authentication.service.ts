import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const currentUser = localStorage.getItem('user');
    return currentUser ? JSON.parse(currentUser).data : null;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/auth/login`, { username: username, password: password })
      .pipe(map(token => {
          // login successful if there's a jwt token in the response
          // EXTRACT FROM TOKEN AND STORE
          localStorage.setItem('user', JSON.stringify({
            data: jwt_decode(token),
            token: token,
          }));
          return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  }
}
