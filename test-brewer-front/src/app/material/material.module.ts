import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  exports: [
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  declarations: [],
})
export class MaterialModule { }
