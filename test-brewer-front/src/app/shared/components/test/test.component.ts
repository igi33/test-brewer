import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../core/services/test.service';
import { first, flatMap } from 'rxjs/operators';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TestInfo } from '../../models/testInfo';
import { Test } from '../../models/test';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: Test;
  testForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.testForm = this.formBuilder.group({
      
    });

    this.loadTest();
  }

  private loadTest() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.testService.getById(id).pipe(first()).subscribe(resp => {
      this.test = resp;
      //console.log(this.test);
    });
  }
}
