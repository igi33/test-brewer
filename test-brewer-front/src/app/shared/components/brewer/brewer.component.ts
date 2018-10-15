import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TestService } from '../../../core/services/test.service';
import { first } from 'rxjs/operators';
import { Question } from '../../models/question';
import { Category } from '../../models/category';
import { QuestionsComponent } from '../questions/questions.component';
import { MatExpansionPanel } from '@angular/material/expansion';
import { AlertService } from 'src/app/core/services/alert.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-brewer',
  templateUrl: './brewer.component.html',
  styleUrls: ['./brewer.component.css']
})
export class BrewerComponent implements OnInit {
  questions: Question[] = [];
  testForm: FormGroup;
  categories: Category[] = [];
  time: number = 90;
  slider: number[] = [];
  @ViewChild(QuestionsComponent) qPanel: QuestionsComponent;
  @ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel>;
  mode = 'side';

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    private alertService: AlertService,
    public breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.testForm = this.formBuilder.group({
      test_title: ['', Validators.required],
      test_description: ['', Validators.required],
      category_id: [1, Validators.required],
      start_time: ['', Validators.required],
      time: ['',Validators.required],
      questions: ''
    });
    this.loadCategories();
    this.qPanel.testMode();

    // screen size observer
    this.breakpointObserver
      .observe(['(min-width: 1280px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // viewport > 1280
          this.mode = 'side';
        } else {
          // viewport < 1280
          this.mode = 'over';
        }
    });

 
  }

  private loadCategories() {
    this.testService.getCategories().pipe(first()).subscribe(categories => {
      this.categories = categories;
    });
  }

  //
  onChange(event) {
    console.log(event);
    if (event.id) {
      this.questions.push(event);
      this.slider.push(1);
    }
  }

  removeQuestion(el) {
    this.panels.forEach(panel => panel.close());
    this.questions.splice(el, 1);
    this.slider.splice(el, 1);
  }

  onSubmit() {

    if (this.testForm.invalid) {
      this.alertService.error("Test is not valid!");
      console.log('losa');
      return;
    }

    // set start time
    let hm = this.testForm.value.time.split(':');
    this.testForm.value.start_time.setHours(hm[0]);
    this.testForm.value.start_time.setMinutes(hm[1]);

    // set end time
    let date = this.testForm.value.start_time.getTime();
    let end = new Date(date + this.time*60000);
    this.testForm.value.end_time = end;

    // set questions

    let qList = [];
    for (let i = 0; i < this.questions.length; i++) {
      const q = this.questions[i];
      qList.push({
        'id': q.id,
        'weight': this.slider[i],
      });
    }

    this.testForm.value['questions'] = qList;

    // send form
    this.testService.submitTest(this.testForm.value).pipe(first()).subscribe(
      resp => {
        this.alertService.success('Test created successfully!');
      },
      error => {
        this.alertService.error(error);
      }
    );

  }

}
