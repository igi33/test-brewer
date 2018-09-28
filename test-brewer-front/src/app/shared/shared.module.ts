import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UserService } from './services/user.service';


@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [],
  providers: [
    UserService,
  ],
})
export class SharedModule { }
