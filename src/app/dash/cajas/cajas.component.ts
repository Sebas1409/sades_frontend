import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CajaDinero } from 'src/app/interfaces/cajadinero';
import { paramsURL } from 'src/app/interfaces/estructuras';
import { FormAperturaCajaComponent } from 'src/app/modales/form-apertura-caja/form-apertura-caja.component';
import { FcajadineroService } from 'src/app/services/fcajadinero.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FusuariosService } from 'src/app/services/fusuarios.service';
import { FventasService } from 'src/app/services/fventas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html'
})

export class CajasComponent implements OnInit {

  _params: paramsURL = null;
  _ulogin = null;

  listado_areas = [];
  listado_sectores = [];

  fsector = null;
  farea = null;

  cajaabierta: CajaDinero = {
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
    modificacion: null
  }

  listado_datos = [];
  total_pagos = 0;

  constructor(private state: ActivatedRoute, private funciones: FuncionesService, private fmysql: FmysqlService,
    private fpre: FprecargadosService, private fusu: FusuariosService, private fven: FventasService,
    private fcaja: FcajadineroService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    this._ulogin = await this.fusu.get_usuario_logueado();

    this.listado_datos = [];

    console.log('Uloign:', this._ulogin);
    console.log('Parametros:', this._params);

    if (this._params.idarea) {
      this.farea = this._params.idarea;
      this.listar_sectores(this.farea);
    }

    this.listado_areas = await this.fpre.listar_areas();
  }

  async listar_sectores(idarea: number) {
    this.listado_sectores = (await this.fpre.buscar_sectores(idarea));
  }

  cerrar_caja() {
    this.funciones.mostrar_modal_confirmacion('Desea cerrar caja?', () => {
      this.fcaja.cerrar_caja(this.cajaabierta.idcaja, this.cajaabierta.monto_cierre).then(res => {
        this.ngOnInit();

        this.cajaabierta = {
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
          modificacion: null
        }
      })
    })
  }

  buscar_caja(idsector: number) {
    this.fcaja.verificar_caja_abierta(idsector).then(idcaja => {
      if (idcaja) {
        this.cajaabierta.idcaja = idcaja;
        this.buscar_datos_caja(idcaja);
      } else {
        this.funciones.mostrar_snack('No existe caja aperturada');
        this.cajaabierta.idcaja = null;
        this.mostrar_modal_apertura(idsector);
      }
    })
  }

  buscar_datos_caja(idcaja) {
    this.fmysql.buscar_id(environment.cajas._api, idcaja).subscribe(res => {
      this.cajaabierta = res.data[0];

      this.fmysql.enviar_post(environment.reportes.rep_caja, { idcaja: idcaja }).subscribe(res => {
        console.log('Rep Caja:', res);
        this.listado_datos = res.data;
        this.calcular_total();
      })
    })
  }

  mostrar_modal_apertura(idsector) {
    this.funciones.mostrar_modal(FormAperturaCajaComponent, 30, {
      params: idsector
    }, (residcaja) => {
      this.cajaabierta.idcaja = residcaja;
      this.buscar_datos_caja(residcaja);
    })
  }

  async calcular_total() {
    this.total_pagos = 0;
    this.listado_datos.forEach(pago => {
      this.total_pagos += pago.monto_pago
    });

    this.cajaabierta.monto_cierre = this.cajaabierta.monto_apertura + this.total_pagos;
  }

}
