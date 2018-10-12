import { Component, OnInit, NgZone } from '@angular/core';
import { TestService } from '../../../core/services/test.service';
import { first } from 'rxjs/operators';
import { TestInfo } from '../../models/testInfo';
import { Category } from '../../models/category';

import { ScrollDispatcher } from '@angular/cdk/overlay';
import { load } from '@angular/core/src/render3/instructions';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  testsByDate = {};
  page = 1;
  categories: Category[] = [];
  selected = 0;

  constructor(
    private testService: TestService, 
    public scroll: ScrollDispatcher,
    private ngZone: NgZone) {
    // detects scrolling
    this.scroll
      .scrolled(500)
      .subscribe((data) => {
        this.loadMore(data);
      });
    }

  ngOnInit() {
    this.loadNextInfo();
    this.loadCategories();
  }
  
  private loadCategories() {
    this.testService.getCategories().pipe(first()).subscribe(categories => {
      this.categories = categories;
    });
  }

  private loadNextInfo() {
    this.testService.getAllInfo(this.page, this.selected).pipe(first()).subscribe(testsInfo => {
      // check if there is more data, if not snackbar
      if (testsInfo['data'].length > 0) {
        this.page++;
        this.showMonths(testsInfo['data']);
      }
    });
  }

  private loadMore(data) {
    let el = data['_elementRef']['nativeElement'];
    if ((el.scrollTop + el.offsetHeight) >= el.scrollHeight) {
      // you're at the bottom of the page
      this.ngZone.run(() => {
        this.loadNextInfo();
      });
    }
  }

  // Date helpers

  private format(date) {
    return new Date(date);
  }

  private duration(date1, date2) {
    let difference = this.diff_minutes(new Date(date1), new Date(date2));
    return difference;
  }

  private diff_minutes(dt2, dt1) 
  {
    let diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff)); 
  }

  // Show months

  private monthName(n) {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];
    return monthNames[n];
  }

  private showMonths(tests) {


    // store new tests
    tests.forEach(test => {

      let date = this.format(test['start_time']);
      let year = date.getFullYear();
      let month = date.getMonth()+100;
      // create year if not exist
      if (!(year in this.testsByDate)) {
        this.testsByDate[year] = {};
      }
      // create month if not exist
      if (!(month in this.testsByDate[year])) {
        this.testsByDate[year][month] = [];
      }
      // store test
      this.testsByDate[year][month].push(test); 
    });
  }

  // Filter by Category
  private filter(cat) {
    console.log(cat);
    this.testsByDate = {};
    this.page = 1;
    this.loadNextInfo();
  }

}
