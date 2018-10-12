import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogregComponent } from './components/logreg/logreg.component';
import { ShowUsersComponent } from './components/show-users/show-users.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TestComponent } from './components/test/test.component';
import { BrewerComponent } from './components/brewer/brewer.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LogregComponent,
    ShowUsersComponent,
    CalendarComponent,
    TestComponent,
    BrewerComponent,
    QuestionsComponent,
    AdminComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class SharedModule { }
