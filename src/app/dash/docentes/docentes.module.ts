import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesComponent } from './docentes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ObservacionesComponent } from './observaciones/observaciones.component';



@NgModule({
  declarations: [
    DocentesComponent,AsistenciaComponent,ObservacionesComponent
  ],
  imports: [
    CommonModule,FormsModule,SharedModule,ReactiveFormsModule
  ]
})
export class DocentesModule { }
