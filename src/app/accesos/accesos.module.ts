import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesosComponent } from './accesos.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccesosComponent
  ],
  imports: [
    CommonModule, LoadingBarModule, ReactiveFormsModule, FormsModule
  ]
})
export class AccesosModule { }
