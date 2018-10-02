import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserService } from './services/user.service';


@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [],
  providers: [
    UserService,
  ],
})
export class SharedModule { }
