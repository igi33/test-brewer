import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionService } from 'src/app/core/services/question.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { Question } from '../../models/question';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {
  qForm: FormGroup;
  slider: number = 2;
  type;
  ans: FormArray;
  questions: Question[] = [];
  test= false;
  @Output() change = new EventEmitter<Question>();

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.qForm = this.formBuilder.group({
      question_title: ['', Validators.required],
      question_content: ['', Validators.required],
      question_type: [1, Validators.required],
      answers: this.formBuilder.array([])
    });

    // add max answers to form
    for (let i = 0; i < 2; i++) {
      this.addItem();
    }

    this.loadQuestions();
  }

  // load user questions
  loadQuestions() {
    this.questionService.getQuestions().pipe(first()).subscribe(questions => {
      this.questions = questions;
    });
  }

  // enable adding question to test
  public testMode() {
    this.test = true;
  }

  // add question to test
  public addToTest(id) {
    this.change.emit(this.questions[id]);
  }

  // create anwser
  createItem(): FormGroup {
    return this.formBuilder.group({
      content: ['', Validators.required],
      correct: false,
    });
  }

  // add new answer
  addItem(): void {
    this.ans = this.qForm.get('answers') as FormArray;
    this.ans.push(this.createItem());
  }

  // remove last answer
  removeItem(): void {
    this.ans.removeAt(this.ans.length - 1);
  }

  // slider change
  private sliderChange(val) {
    console.log('change');
    let diff = val - this.ans.length;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.addItem();
      }
    } else {
      for (let i = 0; i < -diff; i++) {
        this.removeItem();
      }
    }
  }

  // type change
  typeChange(val) {
    if (val == 3) {
      this.sliderChange(1);
    } else {
      this.sliderChange(this.slider);
    }
  }

  onSubmit() {

    if (this.qForm.invalid) {
      this.alertService.error("Question is not valid!");
      return;
    }

    // Form ok, SEND
    console.log('Dobra forma');

    // send form
    this.questionService.submitQuestion(this.qForm.value).pipe(first()).subscribe(
      resp => {
        this.alertService.success('Question created successfully!');
        this.loadQuestions();
      },
      error => {
        this.alertService.error(error);
      }
    );
  }


}
