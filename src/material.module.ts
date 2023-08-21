import { NgModule } from '@angular/core';
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatCardModule } from "@angular/material/card"
import { MatRadioModule } from "@angular/material/radio"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatTableModule } from "@angular/material/table"
import { MatSortModule } from "@angular/material/sort"
import { MatDialogModule } from "@angular/material/dialog"
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  exports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})

export class MaterialModule { }
