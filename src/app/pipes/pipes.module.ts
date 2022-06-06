import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroNumeroPipe } from './filtroNumero.pipe';
import { FiltroTextoPipe } from './filtroTexto.pipe';
import { RellenarPipe } from './rellenar.pipe';
import { MetodopagoPipe } from './metodopago.pipe';

@NgModule({
  declarations: [FiltroNumeroPipe, FiltroTextoPipe, RellenarPipe, MetodopagoPipe],
  exports: [FiltroNumeroPipe, FiltroTextoPipe, RellenarPipe, MetodopagoPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
