import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
  }

}
