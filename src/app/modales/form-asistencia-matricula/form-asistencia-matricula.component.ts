import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asistencias } from 'src/app/interfaces/asistencias';
import { DetalleVenta } from 'src/app/interfaces/detalle_venta';
import { formatoGuardar, paraModal } from 'src/app/interfaces/estructuras';
import { Matriculas } from 'src/app/interfaces/matriculas';
import { Pagos } from 'src/app/interfaces/pagos';
import { Ventas } from 'src/app/interfaces/ventas';
import { ControlesService } from 'src/app/services/controles.service';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FventasService } from 'src/app/services/fventas.service';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-asistencia-matricula',
  templateUrl: './form-asistencia-matricula.component.html'
})

export class FormAsistenciaMatriculaComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Asistencias = {
    idasistencia: null,
    idmatricula: null,
    fingreso: this.funciones.get_fecha_local()._fecha_actual,
    hingreso: this.funciones.get_fecha_local()._hora_actual,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null
  }

  tfecha = this.controles._requerido();
  thora = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormAsistenciaMatriculaComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService, private fmat: FmatriculasService,
    private fven: FventasService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    this.item.idmatricula = this.data.params;

    if (this._edicion) {
      this._titulo = "Editar Asistencia";
      this.item = this.data.item;
    } else {
      this._titulo = "Registar Asistencia";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  validar_accion() {
    if (this._edicion) {
      this.modificar_item();
    } else {
      this.registrar_item();
    }
  }

  async registrar_item() {
    let datos: formatoGuardar = {
      datos: [
        this.item.idasistencia,
        this.item.idmatricula,
        this.item.fingreso,
        this.item.hingreso,
        this.item.observaciones,
        1, 'now()', null
      ]
    }
    this.fmysql.registrar(environment.matriculas.asistencia, datos).subscribe(res => {
      console.log('Registro de Asistencia', res);
      this.cerrar_ventana(true);
    })
  }

  modificar_item() {

  }

  cerrar_ventana(respuesta: any) {
    this.dialogRef.close(respuesta);
  }

}
