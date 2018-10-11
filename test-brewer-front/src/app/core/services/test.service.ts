import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TestInfo } from '../../shared/models/testInfo';
import { Test } from '../../shared/models/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllInfo() {
    return this.http.get<TestInfo[]>(`/api/testsInfo`);
  }

  getById(id: number) {
    return this.http.get<Test>(`/api/tests/${id}`);
  }

}