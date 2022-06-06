import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dietas, DietasAsignadas } from 'src/app/interfaces/dietas';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-asignar-dietas',
  templateUrl: './form-asignar-dietas.component.html'
})

export class FormAsignarDietasComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: DietasAsignadas = {
    iddietasignada: null,
    idmatricula: null,
    iddieta: null,
    fecha: this.funciones.get_fecha_local()._fecha_actual,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null,
  }

  tfecha = this.controles._requerido();
  tdieta = this.controles._requerido();

  listado_dietas = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormAsignarDietasComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;
    this.item.idmatricula = this.data.params;

    this.listar_dietas();

    if (this._edicion) {
      this._titulo = "Editar Asignacion de Dieta";
      this.item = this.data.item;
    } else {
      this._titulo = "Registar Asignacion de Dieta";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  listar_dietas() {
    this.fmysql.listar(environment.historico.dietas).subscribe(res => {
      this.listado_dietas = res.data;
    })
  }

  texto_terminado(cadena) {
    console.log('Texto escrito:', cadena);
  }

  validar_accion() {
    if (this._edicion) {
      this.modificar_item();
    } else {
      this.registrar_item();
    }
  }

  registrar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoGuardar = {
      datos: [
        null,
        this.item.idmatricula,
        this.item.iddieta,
        this.item.fecha,
        this.item.observaciones,
        1, 'now()', null
      ]
    };
    this.fmysql.registrar(environment.historico.dietas_asignadas, datos).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.cerrar_ventana(true);
      } else {
        this.cerrar_ventana(true);
      }
    })
  }

  modificar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoModificacion = {
      idcampo: { nombre: 'iddietasignada', valor: this.item.iddietasignada },
      campos: [
        'iddieta',
        'fecha',
        'observaciones',
        'modificacion'
      ],
      valores: [
        this.item.iddieta,
        this.item.fecha,
        this.item.observaciones,
        'now()',
      ]
    };
    this.fmysql.modificar(environment.historico.dietas_asignadas, datos).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.cerrar_ventana(true);
      } else {
        this.cerrar_ventana(true);
      }
    })
  }

  cerrar_ventana(respuesta: any) {
    this.dialogRef.close(respuesta);
  }

}
