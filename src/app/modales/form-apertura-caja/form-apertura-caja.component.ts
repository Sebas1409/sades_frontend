import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CajaDinero } from 'src/app/interfaces/cajadinero';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { Marca } from 'src/app/interfaces/marca';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-apertura-caja',
  templateUrl: './form-apertura-caja.component.html'
})

export class FormAperturaCajaComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: CajaDinero = {
    idcaja: null,
    idsector: null,
    fecha_apertura: null,
    hora_apertura: null,
    monto_apertura: null,
    fecha_cierre: null,
    hora_cierre: null,
    monto_cierre: null,
    vigencia: null,
    creacion: null,
    modificacion: null,
  }

  tmonto = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormAperturaCajaComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    if (this._edicion) {
      this._titulo = "Editar Marca";
      this.item = this.data.item;
    } else {
      this._titulo = "Registar nuevo Marca";
      this.item.idsector = this.data.params;
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

  registrar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoGuardar = {
      datos: [
        null,
        this.item.idsector,
        this.funciones.get_fecha_local()._fecha_actual,
        this.funciones.get_fecha_local()._hora_actual,
        this.item.monto_apertura,
        null, //this.item.fecha_cierre,
        null, //this.item.hora_cierre,
        null, //this.item.monto_cierre,
        1, 'now()', null
      ]
    };
    this.fmysql.registrar(environment.cajas._api, datos).subscribe(res => {
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
    /*
    this.funciones.iniciar_loader();
    let datos: formatoModificacion = {
      idcampo: { nombre: 'idmarca', valor: this.item.idmarca },
      campos: [
        'nombre',
        'modificacion'
      ],
      valores: [
        this.item.nombre,
        'now()',
      ]
    };
    this.fmysql.modificar(environment.cajas._api, datos).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.cerrar_ventana(true);
      } else {
        this.cerrar_ventana(true);
      }
    })*/
  }

  cerrar_ventana(respuesta: any) {
    this.dialogRef.close(respuesta);
  }

}
