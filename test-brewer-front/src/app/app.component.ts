import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertService } from './core/services/alert.service';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private alertService: AlertService,
    public snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.alertService.subject.subscribe(message => {
      if (message) {
        const dur = message.type === 'error' ? 7500 : 5000;
        snackBar.open(message.text, null, {
          duration: dur,
        });
      }
    });
    this.authService.initToken();
  }
}
