import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  ngOnInit() {
  }

}
