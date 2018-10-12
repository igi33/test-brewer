import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  submitAnswers(answers) {
    return this.http.post(`/api/submissions`, answers);
  }
}
