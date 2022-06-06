import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenesComponent } from './examenes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { RegExamenComponent } from './reg-examen/reg-examen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AsignacionExamenComponent } from './asignacion-examen/asignacion-examen.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExamenesComponent,
    RegExamenComponent,
    AsignacionExamenComponent
  ],
  imports: [
    CommonModule,SharedModule,MatIconModule, BrowserAnimationsModule,MatButtonModule,FormsModule
  ]
})
export class ExamenesModule { }
