import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/services/auth.guard';

import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LogregComponent} from './shared/components/logreg/logreg.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { TestComponent } from './shared/components/test/test.component';
import { ShowUsersComponent } from './shared/components/show-users/show-users.component';
import { BrewerComponent } from './shared/components/brewer/brewer.component';
import { QuestionsComponent } from './shared/components/questions/questions.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ShowUsersComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'test/:id', component: TestComponent },
      { path: 'brewer', component: BrewerComponent },
      { path: 'questions', component: QuestionsComponent },
    ]
  },
  { path: 'auth', component: LogregComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
