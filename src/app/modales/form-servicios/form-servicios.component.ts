import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { Servicios } from 'src/app/interfaces/servicios';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-servicios',
  templateUrl: './form-servicios.component.html'
})
export class FormServiciosComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Servicios = {
    idservicio: null,
    idsector: null,
    nombre: null,
    dias_vigencia: 1,
    cant_sesiones: 1,
    precio_venta: null,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null,

    idarea: null
  }

  listado_areas = [];
  listado_sectores = [];

  tarea = this.controles._requerido();
  tsector = this.controles._requerido();
  tnombre = this.controles._requerido();
  tdias = this.controles._requerido();
  tsesiones = this.controles._requerido();
  tpventa = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormServiciosComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    this.listado_areas = await this.fpre.listar_areas();

    if (this._edicion) {
      this._titulo = "Editar Servicio";
      this.item = this.data.item;
      this.listar_sectores(this.item.idarea);
    } else {
      this._titulo = "Registar nuevo Servicio";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  async listar_sectores(idarea: number) {
    let datos = await this.fpre.buscar_sectores(idarea);
    this.listado_sectores = datos.filter(dato => dato.estienda == 0);
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
        this.item.nombre,
        this.item.dias_vigencia,
        this.item.cant_sesiones,
        this.item.precio_venta,
        this.item.observaciones,
        1, 'now()', null
      ]
    };
    this.fmysql.registrar(environment.servicios._api, datos).subscribe(res => {
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
      idcampo: { nombre: 'idservicio', valor: this.item.idservicio },
      campos: [
        'idsector',
        'nombre',
        'dias_vigencia',
        'cant_sesiones',
        'precio_venta',
        'observaciones',
        'modificacion'
      ],
      valores: [
        this.item.idsector,
        this.item.nombre,
        this.item.dias_vigencia,
        this.item.cant_sesiones,
        this.item.precio_venta,
        this.item.observaciones,
        'now()',
      ]
    };
    this.fmysql.modificar(environment.servicios._api, datos).subscribe(res => {
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
