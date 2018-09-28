import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')).data;
  }

  getAll() {
    return this.http.get<User[]>(`/api/users`);
  }

  getById(id: number) {
    return this.http.get(`/api/users/` + id);
  }

  register(user: User) {
    return this.http.post(`/api/users`, user);
  }

  update(user: User) {
    return this.http.put(`/api/users/` + user.id, user);
  }
}
