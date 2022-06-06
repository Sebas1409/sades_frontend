import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesosComponent } from './accesos/accesos.component';
import { CajasComponent } from './dash/cajas/cajas.component';
import { ClientesComponent } from './dash/clientes/clientes.component';
import { CrearClienteComponent } from './dash/clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './dash/clientes/editar-cliente/editar-cliente.component';
import { DashComponent } from './dash/dash.component';
import { CrearDietaComponent } from './dash/dietas/crear-dieta/crear-dieta.component';
import { DietasComponent } from './dash/dietas/dietas.component';
import { EditarDietaComponent } from './dash/dietas/editar-dieta/editar-dieta.component';
import { AsistenciaComponent } from './dash/docentes/asistencia/asistencia.component';
import { ObservacionesComponent } from './dash/docentes/observaciones/observaciones.component';
import { AsignacionExamenComponent } from './dash/examenes/asignacion-examen/asignacion-examen.component';
import { ExamenesComponent } from './dash/examenes/examenes.component';
import { RegExamenComponent } from './dash/examenes/reg-examen/reg-examen.component';
import { EditarMatriComponent } from './dash/matriculas/editar-matri/editar-matri.component';
import { MatriculasComponent } from './dash/matriculas/matriculas.component';
import { RegMatriComponent } from './dash/matriculas/reg-matri/reg-matri.component';
import { PersonalComponent } from './dash/personal/personal.component';
import { MarcasComponent } from './dash/productos/marcas/marcas.component';
import { CrearProdComponent } from './dash/productos/producto/crear-prod/crear-prod.component';
import { EditarProdComponent } from './dash/productos/producto/editar-prod/editar-prod.component';
import { ProductosComponent } from './dash/productos/productos.component';
import { TiposProductoComponent } from './dash/productos/tipos-producto/tipos-producto.component';
import { UnidadesComponent } from './dash/productos/unidades/unidades.component';
import { RepVentasComponent } from './dash/reportes/rep-ventas/rep-ventas.component';
import { ServiciosComponent } from './dash/servicios/servicios.component';
import { TienditaComponent } from './dash/tiendita/tiendita.component';

const routes: Routes = [
  { path: '', component: AccesosComponent },
  {
    path: 'dash', component: DashComponent, children: [
      { path: 'clientes/:params', component: ClientesComponent },
      { path: 'clientes/crear/:params', component: CrearClienteComponent },
      { path: 'clientes/editar/:params', component: EditarClienteComponent },

      { path: 'matriculas/:params', component: MatriculasComponent },
      { path: 'matriculas/registro/:params', component: RegMatriComponent },
      { path: 'matriculas/editar/:params', component: EditarMatriComponent },

      { path: 'caja-diaria/:params', component: CajasComponent },

      { path: 'ptoventa/:params', component: TienditaComponent },

      { path: 'personal/:params', component: PersonalComponent },

      { path: 'servicios/:params', component: ServiciosComponent },

      { path: 'marcas/:params', component: MarcasComponent },
      { path: 'tipos-producto/:params', component: TiposProductoComponent },
      { path: 'unidades/:params', component: UnidadesComponent },

      { path: 'productos/:params', component: ProductosComponent },
      { path: 'productos/crear/:params', component: CrearProdComponent },
      { path: 'productos/editar/:params', component: EditarProdComponent },

      { path: 'dietas/:params', component: DietasComponent },
      { path: 'dietas/crear/:params', component: CrearDietaComponent },
      { path: 'dietas/editar/:params', component: EditarDietaComponent },

      { path: 'reportes/rep-ventas', component: RepVentasComponent },


      { path: 'asistencia', component: AsistenciaComponent },
      { path: 'anotaciones', component: ObservacionesComponent },

      { path: 'eventos-examen', component: ExamenesComponent },
      { path: 'eventos-examen/registro', component: RegExamenComponent },
      { path: 'eventos-examen/editar/:id', component: RegExamenComponent },
      { path: 'eventos-examen/asignacion', component: AsignacionExamenComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
