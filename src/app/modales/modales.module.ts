//tslint:disable
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmacionComponent } from './modal-confirmacion/modal-confirmacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormServiciosComponent } from './form-servicios/form-servicios.component';
import { SharedModule } from '../shared/shared.module';
import { FormMarcasComponent } from './form-marcas/form-marcas.component';
import { FormTipoProdComponent } from './form-tipo-prod/form-tipo-prod.component';
import { FormUnidadesComponent } from './form-unidades/form-unidades.component';
import { FormAjusteInventarioComponent } from './form-ajuste-inventario/form-ajuste-inventario.component';
import { FormEmpleadosComponent } from './form-empleados/form-empleados.component';
import { FormClaveEmpleadoComponent } from './form-clave-empleado/form-clave-empleado.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { FormPagoMatriculaComponent } from './form-pago-matricula/form-pago-matricula.component';
import { FormDuplicaMatriComponent } from './form-duplica-matri/form-duplica-matri.component';
import { FormAsistenciaMatriculaComponent } from './form-asistencia-matricula/form-asistencia-matricula.component';
import { ModalReportesComponent } from './modal-reportes/modal-reportes.component';
import { RouterModule } from '@angular/router';
import { FormDietasComponent } from './form-dietas/form-dietas.component';
import { FormAsignarDietasComponent } from './form-asignar-dietas/form-asignar-dietas.component';
import { FormMedidasComponent } from './form-medidas/form-medidas.component';
import { FormImagenesComponent } from './form-imagenes/form-imagenes.component';
import { FormAperturaCajaComponent } from './form-apertura-caja/form-apertura-caja.component';

@NgModule({
  imports: [
    CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule
  ],
  declarations: [ModalConfirmacionComponent, FormServiciosComponent, FormMarcasComponent, FormTipoProdComponent,
    FormUnidadesComponent, FormAjusteInventarioComponent, FormEmpleadosComponent, FormClaveEmpleadoComponent, FormClienteComponent,
    FormPagoMatriculaComponent, FormDuplicaMatriComponent, FormAsistenciaMatriculaComponent, ModalReportesComponent, FormDietasComponent,
    FormAsignarDietasComponent, FormMedidasComponent, FormImagenesComponent, FormAperturaCajaComponent],
  entryComponents: [ModalConfirmacionComponent, FormServiciosComponent, FormMarcasComponent, FormTipoProdComponent,
    FormUnidadesComponent, FormAjusteInventarioComponent, FormEmpleadosComponent, FormClaveEmpleadoComponent, FormClienteComponent,
    FormPagoMatriculaComponent, FormDuplicaMatriComponent, FormAsistenciaMatriculaComponent, ModalReportesComponent, FormDietasComponent,
    FormAsignarDietasComponent, FormMedidasComponent, FormImagenesComponent, FormAperturaCajaComponent],
})
export class ModalesModule { }
