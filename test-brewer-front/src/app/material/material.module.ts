import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  exports: [
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  declarations: [],
})
export class MaterialModule { }
