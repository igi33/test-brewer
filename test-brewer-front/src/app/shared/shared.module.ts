import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // CommonModule,
    // MaterialModule,
    // ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [],
})
export class SharedModule { }
