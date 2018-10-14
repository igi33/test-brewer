import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/api/users`);
  }

  getById(id: number) {
    return this.http.get(`/api/users/${id}`);
  }

  register(user: User) {
    return this.http.post(`/api/users`, user);
  }

  update(user: User) {
    return this.http.put(`/api/users/${user.id}`, user);
  }

  promote(id: number, status) {
    return this.http.patch(`/api/users/${id}`, { is_admin: status });
  }
}
