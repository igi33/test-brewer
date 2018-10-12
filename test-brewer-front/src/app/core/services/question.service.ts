import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../shared/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  submitQuestion(question) {
    return this.http.post(`/api/questions`, question);
  }

  getQuestions() {
    return this.http.get<Question[]>(`/api/questionsUser`);
  }
}
