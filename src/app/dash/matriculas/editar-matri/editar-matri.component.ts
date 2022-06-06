import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { paramsURL } from 'src/app/interfaces/estructuras';
import { Matriculas } from 'src/app/interfaces/matriculas';
import { Servicios } from 'src/app/interfaces/servicios';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { Clientes } from 'src/app/interfaces/clientes';
import { FclientesService } from 'src/app/services/fclientes.service';
import { FusuariosService } from 'src/app/services/fusuarios.service';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FormPagoMatriculaComponent } from 'src/app/modales/form-pago-matricula/form-pago-matricula.component';
import { FormDuplicaMatriComponent } from 'src/app/modales/form-duplica-matri/form-duplica-matri.component';
import { FormAsistenciaMatriculaComponent } from 'src/app/modales/form-asistencia-matricula/form-asistencia-matricula.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-matri',
  templateUrl: './editar-matri.component.html'
})
export class EditarMatriComponent implements OnInit {

  _editando = false;
  _titulo_componente = 'Detalles Matrícula';

  _params: paramsURL = null;

  item: Matriculas = {
    idmatricula: null,
    idservicio: null,
    idcliente: null,
    idempleado: null,
    idestadomat: 1,
    fmatricula: this.funciones.get_fecha_local()._fecha_actual,
    precio_mat: null,
    diasextra: null,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null,

    cliente: null,
    servicio: null,
    finicio: null,
    ffinal: null,
    estado: null,
    dias_restantes: null,
    pago_total: null,
    total_deuda: null,
  };

  dias_extra = 0;

  testado = this.controles._requerido();
  tcliente = this.controles._requerido();
  tservicio = this.controles._requerido();
  tprecio = this.controles._requerido();
  tfinicio = this.controles._requerido();

  estados_matricula = [];

  pagos_matricula = [];
  asistencias_matricula = [];

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private controles: ControlesService,
    private router: Router, private cdref: ChangeDetectorRef, private fmatri: FmatriculasService, private fpre: FprecargadosService,
    private fmysql: FmysqlService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.estados_matricula = await this.fpre.listar_estados_matricula();
    this.buscar_matricula();
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  mostrar_modal_pagos(editar: boolean, item?: any) {
    this.funciones.mostrar_modal(FormPagoMatriculaComponent, 40, {
      editar: editar,
      item: item,
      params: this._params.idsel
    }, () => {
      this.buscar_matricula();
    })
  }

  buscar_matricula() {
    this.fmatri.buscar_matricula(this._params.idsel).then(mat => {
      this.item = mat;
    })
  }

  duplicar_matricula() {
    this.funciones.mostrar_modal(FormDuplicaMatriComponent, 30, {
      item: this.item
    }, (idmat) => {
      this.ir_a_editar(idmat);
    })
  }

  async cambiar_estado_matricula() {
    this.funciones.mostrar_modal_confirmacion('Desea cambiar estado de matricula?', () => {
      this.fmatri.cambiar_estado_matricula(this.item).then(res => {
        this.funciones.mostrar_snack('Matricula modificada');
        this.buscar_matricula();
      })
    })
  }

  async agregar_dias_extra() {
    this.funciones.mostrar_modal_confirmacion('Desea agregar dias a matricula?', () => {
      this.fmatri.agregar_dias_extra(this.item, this.dias_extra).then(res => {
        this.funciones.mostrar_snack('Matricula modificada');
        this.buscar_matricula();
      })
    })
  }

  ir_a_editar(idmat: number) {
    this._params.idsel = idmat;
    this.funciones.encripta(this._params).then(deco => {
      this.funciones.redireccionar('/dash/matriculas/editar/', deco);
    })
  }

  regresar_listado() {
    this.router.navigate(['dash/matriculas', this.state.snapshot.params.params]);
  }

}
