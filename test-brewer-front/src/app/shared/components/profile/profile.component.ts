import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  displayedSubmissionColumns: string[] = ['title', 'created_at', 'score'];
  submissionDataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild('submissionPaginator') submissionPaginator: MatPaginator;
  @ViewChild('submissionTable') submissionSort: MatSort;
  user: any;
  userSubscription: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.submissionDataSource.paginator = this.submissionPaginator;
    this.submissionDataSource.sort = this.submissionSort;
    this.loadProfile();
  }

  loadProfile() {
    this.userSubscription = this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.userService.getById(id).pipe(first()).subscribe(resp => {
        this.user = resp;
        this.fixSort();
      });
    });
  }

  // for to be able to sort
  fixSort() {
    console.log(this.user);

    this.user.submissions.forEach(element => {
      console.log('cao');
      element['title'] = element['test']['test_title'];
    });

    // fill the table
    console.log(this.user);
    this.submissionDataSource.data = this.user['submissions'];
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
