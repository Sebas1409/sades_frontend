import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleVenta } from 'src/app/interfaces/detalle_venta';
import { paraModal } from 'src/app/interfaces/estructuras';
import { Matriculas } from 'src/app/interfaces/matriculas';
import { Pagos } from 'src/app/interfaces/pagos';
import { Ventas } from 'src/app/interfaces/ventas';
import { ControlesService } from 'src/app/services/controles.service';
import { FcajadineroService } from 'src/app/services/fcajadinero.service';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FventasService } from 'src/app/services/fventas.service';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-pago-matricula',
  templateUrl: './form-pago-matricula.component.html'
})

export class FormPagoMatriculaComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  venta: Ventas = {
    idventa: null,
    idcaja: null,
    idcliente: null,
    idempleado: null,
    idsector: null,
    idmatricula: null,
    tipo_doc: 0,
    serie_doc: null,
    nro_doc: null,
    fecha_doc: this.funciones.get_fecha_local()._fecha_actual,
    vigencia: null,
    creacion: null,
    modificacion: null
  }

  matricula: Matriculas = {
    idmatricula: null,
    idservicio: null,
    idcliente: null,
    idempleado: null,
    idestadomat: null,
    fmatricula: null,
    precio_mat: null,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null,
  }

  pago: Pagos = {
    idpago: null,
    idventa: null,
    fecha_pago: this.funciones.get_fecha_local()._fecha_actual,
    metodo_pago: 0,
    monto_pago: null,
    encaja: 1,
    congelado: 0,
    vigencia: null,
    creacion: null,
    modificacion: null
  }

  detalle_venta: DetalleVenta = {
    iddetventa: null,
    idventa: null,
    descripcion: null,
    unidad: null,
    cantidad: null,
    precio_compra: null,
    precio_venta: null,
    monto_gravado: null,
    monto_igv: null,
    monto_total: null,
    vigencia: null,
    creacion: null,
  }

  tipos_doc_ventas = new ListasSistema().tipos_documentos_venta;
  metodos_pagos = new ListasSistema().metodos_pago;
  tipo_congelado = new ListasSistema().tipos_booleanos;

  tdocventa = this.controles._requerido();
  tmetpago = this.controles._requerido();
  tfecha = this.controles._requerido();
  tmonto = this.controles._requerido();
  tcongelado = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormPagoMatriculaComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService, private fmat: FmatriculasService,
    private fven: FventasService, private fcaja: FcajadineroService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    this.venta.idmatricula = this.data.params.idmat;
    this.venta.idsector = this.data.params.idsec;

    this.venta.idcaja = await this.fcaja.verificar_caja_abierta(this.data.params.idsec);

    this.buscar_matricula(this.data.params.idmat);

    if (this._edicion) {
      this._titulo = "Editar Pago";
      this.pago = this.data.item;
    } else {
      this._titulo = "Registar nuevo Pago";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  buscar_matricula(idmat: number) {
    this.fmat.buscar_matricula(idmat).then(mat => {
      this.matricula = mat;
      this.pago.monto_pago = this.matricula.total_deuda;
    })
  }

  validar_accion() {
    if (this._edicion) {
      this.modificar_item();
    } else {
      this.registrar_item();
    }
  }

  generar_detalle_venta() {
    this.detalle_venta = {
      iddetventa: null,
      idventa: null,
      descripcion: this.matricula.servicio,
      unidad: 'NIU',
      cantidad: 1,
      precio_compra: 0,
      precio_venta: this.pago.monto_pago,
      monto_gravado: null,
      monto_igv: null,
      monto_total: null,
      vigencia: null,
      creacion: null,
    }
    this.fven._calcular_detalle(this.detalle_venta);
  }

  async registrar_item() {
    this.venta.fecha_doc = this.pago.fecha_pago;
    this.venta.idcliente = this.matricula.idcliente;

    this.fven.generar_venta(this.venta).then((idventa: number) => {
      this.generar_detalle_venta();
      this.fven.registrar_detalles_venta(idventa, [this.detalle_venta]).then(det => {
        this.fven.registrar_pago(idventa, this.venta.idcaja, this.pago).then(pago => {
          this.cerrar_ventana(true);
        });
      })
    })
  }

  modificar_item() {

  }

  cerrar_ventana(respuesta: any) {
    this.dialogRef.close(respuesta);
  }

}
