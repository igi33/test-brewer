import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [],
})
export class SharedModule { }
