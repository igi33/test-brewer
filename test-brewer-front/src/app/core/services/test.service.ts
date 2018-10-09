import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TestInfo } from '../../core/models/testInfo';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllInfo() {
    return this.http.get<TestInfo[]>(`/api/testsInfo`);
  }


}
