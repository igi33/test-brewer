import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LogregComponent} from './core/components/logreg/logreg.component';

import { AuthGuard } from './core/guards/auth.guard';
import { ShowUsersComponent } from './core/components/show-users/show-users.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: ShowUsersComponent },
        ]
      }
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
