import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';

import { ErrorInterceptor } from './services/error.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';

import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';

import { UserService } from './services/user.service';
import { TestService } from './services/test.service';
import { SubmissionService } from './services/submission.service';


@NgModule({
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService,
    AlertService,
    UserService,
    TestService,
    SubmissionService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class CoreModule { }
