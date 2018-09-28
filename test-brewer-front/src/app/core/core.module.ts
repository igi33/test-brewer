import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptor } from './services/error.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';

import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class CoreModule { }
