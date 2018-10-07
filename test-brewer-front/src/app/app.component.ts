import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertService } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private alertService: AlertService,
              public snackBar: MatSnackBar) {
    this.alertService.subject.subscribe(message => {
      // console.log('message:', message);
      if (message) {
        snackBar.open(message.text, null, {
          duration: 5000,
        });
      }
    });
  }
}
