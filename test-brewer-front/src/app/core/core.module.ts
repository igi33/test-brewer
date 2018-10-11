import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptor } from './services/error.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { LogregComponent } from './components/logreg/logreg.component';
import { ShowUsersComponent } from './components/show-users/show-users.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TestService } from './services/test.service';
import { TestComponent } from './components/test/test.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LogregComponent,
    ShowUsersComponent,
    CalendarComponent,
    TestComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    TestService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class CoreModule { }
