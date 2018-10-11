import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-logreg',
  templateUrl: './logreg.component.html',
  styleUrls: ['./logreg.component.css']
})
export class LogregComponent {
  selectedIndex = 0;
  @ViewChild(LoginComponent) login: LoginComponent;

  constructor() { }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  readyLogin(username: string): void {
    this.login.prepareForm(username);
    this.selectTab(0);
  }

}
