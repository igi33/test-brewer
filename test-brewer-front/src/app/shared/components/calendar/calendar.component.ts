import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../core/services/test.service';
import { TestInfo } from '../../models/testInfo';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  testsInfo: TestInfo[] = [];

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.loadAllTestsInfo();
  }

  private loadAllTestsInfo() {
    this.testService.getAllInfo().pipe(first()).subscribe(testsInfo => {
      this.testsInfo = testsInfo;
    });
  }

}
