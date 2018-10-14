import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../core/services/test.service';
import { SubmissionService } from '../../../core/services/submission.service';
import { first, flatMap } from 'rxjs/operators';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { Test } from '../../models/test';
import { Question } from '../../models/question';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: Test;
  testForm: FormGroup;
  loading = false;
  alreadyTaken = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private testService: TestService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadTest();
  }

  private loadTest() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.testService.getById(id).pipe(first()).subscribe(resp => {
      this.test = resp;

      const userId = this.authService.getCurrentUser().sub;
      this.submissionService.testAlreadyTaken(this.test.id, userId).pipe(first()).subscribe((subResp: any) => {
        console.log('subResp', subResp);
        console.log('controls1', this.testForm.controls);

        this.alreadyTaken = true;

        // fill form control values
        subResp.answers.forEach((ans: any) => {
          if (ans.question.question_type === 3 || ans.question.question_type === 2) {
            this.testForm.controls[ans.question_id].setValue(ans.answer_value);
          } else if (false) {

          }
        });
        console.log('controls2', this.testForm.controls);

        this.testForm.disable();

        this.alertService.info('You have already taken this test!');
      });

      const controlObject: any = {};
      this.test.questions.forEach((q: Question) => {
        // 1 is checkbox, 2 is radio, 3 is text input
        if (q.question_type === 1) {
          controlObject[q.id] = this.formBuilder.array([]);
        } else {
          controlObject[q.id] = [''];
        }
      });
      this.testForm = this.formBuilder.group(controlObject);
    });
  }

  updateCboxArray(id, isChecked, key) {
    const cboxArray = <FormArray>this.testForm.get(key.toString());
    if (isChecked) {
      cboxArray.push(new FormControl(id.toString()));
    } else {
      const idx = cboxArray.controls.findIndex(x => x.value === id.toString());
      if (idx > -1) {
        cboxArray.removeAt(idx);
      }
    }
  }

  onSubmit() {
    console.log('testForm submitted data', this.testForm.value);
    if (window.confirm('Are you sure you want to submit?')) {
      this.loading = true;

      const requestAnswers = [];
      const formObject = this.testForm.value;
      for (const key in formObject) {
        if (formObject.hasOwnProperty(key)) {
          const val = formObject[key];
          requestAnswers.push({
            question_id: key,
            value: val,
          });
        }
      }

      const requestBody = {
        test_id: this.test.id,
        user_id: this.authService.getCurrentUser().sub,
        answers: requestAnswers,
      };

      this.submissionService.submitAnswers(requestBody).pipe(first()).subscribe(
        resp => {
          this.loading = false;

          this.alertService.success('Test submitted successfully!');
        },
        error => {
          this.loading = false;

          this.alertService.error(error);
        }
      );
    }
  }
}
