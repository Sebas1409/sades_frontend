import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { RouterModule } from '@angular/router';
import { FiltroTablaComponent } from './filtro-tabla/filtro-tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TituloModalComponent } from './titulo-modal/titulo-modal.component';
import { TituloSeccionComponent } from './titulo-seccion/titulo-seccion.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { FiltroSimpleComponent } from './filtro-simple/filtro-simple.component';
import { FiltroTextoComponent } from './filtro-texto/filtro-texto.component';
import { CuadroTextoComponent } from './cuadro-texto/cuadro-texto.component';

import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    EncabezadoComponent, FiltroTablaComponent, TituloModalComponent, TituloSeccionComponent, UploadImageComponent,
    FiltroSimpleComponent, FiltroTextoComponent, CuadroTextoComponent],
  imports: [
    CommonModule, LoadingBarModule, RouterModule, FormsModule, ReactiveFormsModule, AngularEditorModule
  ],
  exports: [
    EncabezadoComponent, FiltroTablaComponent, TituloModalComponent, TituloSeccionComponent, UploadImageComponent,
    FiltroSimpleComponent, FiltroTextoComponent, CuadroTextoComponent]
})
export class SharedModule { }
