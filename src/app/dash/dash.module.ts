import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ServiciosComponent } from './servicios/servicios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { TiposProductoComponent } from './productos/tipos-producto/tipos-producto.component';
import { MarcasComponent } from './productos/marcas/marcas.component';
import { UnidadesComponent } from './productos/unidades/unidades.component';
import { CrearProdComponent } from './productos/producto/crear-prod/crear-prod.component';
import { EditarProdComponent } from './productos/producto/editar-prod/editar-prod.component';
import { AjusteInventarioComponent } from './productos/producto/ajuste-inventario/ajuste-inventario.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { PersonalComponent } from './personal/personal.component';
import { RegMatriComponent } from './matriculas/reg-matri/reg-matri.component';
import { EditarMatriComponent } from './matriculas/editar-matri/editar-matri.component';
import { TienditaComponent } from './tiendita/tiendita.component';
import { RepVentasComponent } from './reportes/rep-ventas/rep-ventas.component';
import { DietasComponent } from './dietas/dietas.component';
import { CrearDietaComponent } from './dietas/crear-dieta/crear-dieta.component';
import { EditarDietaComponent } from './dietas/editar-dieta/editar-dieta.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatPagosComponent } from './matriculas/mat-pagos/mat-pagos.component';
import { MatAsistenciasComponent } from './matriculas/mat-asistencias/mat-asistencias.component';
import { MatDietasComponent } from './matriculas/mat-dietas/mat-dietas.component';
import { MatMedidasComponent } from './matriculas/mat-medidas/mat-medidas.component';
import { MatImagenesComponent } from './matriculas/mat-imagenes/mat-imagenes.component';

import { LightboxModule } from 'ngx-lightbox';
import { CajasComponent } from './cajas/cajas.component';
import { DocentesModule } from './docentes/docentes.module';
import { ExamenesModule } from './examenes/examenes.module';

@NgModule({
  declarations: [
    DashComponent,
    ServiciosComponent,
    ClientesComponent,
    ProductosComponent,
    TiposProductoComponent,
    MarcasComponent,
    UnidadesComponent,
    CrearProdComponent,
    EditarProdComponent,
    AjusteInventarioComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    MatriculasComponent,
    RegMatriComponent,
    PersonalComponent,
    EditarMatriComponent,
    TienditaComponent,
    RepVentasComponent,
    DietasComponent,
    CrearDietaComponent,
    EditarDietaComponent,
    MatPagosComponent,
    MatAsistenciasComponent,
    MatDietasComponent,
    MatMedidasComponent,
    MatImagenesComponent,
    CajasComponent
  ],
  imports: [
    CommonModule, MatSidenavModule, FormsModule, BrowserAnimationsModule, MatCardModule,
    MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatMenuModule, ReactiveFormsModule,
    LoadingBarModule, SharedModule, PipesModule, AngularEditorModule, LightboxModule , DocentesModule, ExamenesModule
  ]
})
export class DashModule { }
