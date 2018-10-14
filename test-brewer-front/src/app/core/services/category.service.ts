import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Category[]>(`/api/categories`);
  }

  delete(id: number) {
    return this.http.delete(`/api/categories/${id}`);
  }

  add(catName: string) {
    return this.http.post<Category>(`/api/categories`, { category_name: catName });
  }
}
