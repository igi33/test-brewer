import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TestInfo } from '../../shared/models/testInfo';
import { Test } from '../../shared/models/test';
import { Category } from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllInfo(page, cat) {
    // correct line : 
    return this.http.get(`/api/testsInfo?page=${page}&cat=${cat}`);
    // not enough test so show duplicates to test scroll
    // return this.http.get(`/api/testsInfo`);
  }

  getById(id: number) {
    return this.http.get<Test>(`/api/tests/${id}`);
  }

  getCategories() {
    return this.http.get<Category[]>(`/api/categories`);
  }

}
