import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { campoFiltro, formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FormClaveEmpleadoComponent } from 'src/app/modales/form-clave-empleado/form-clave-empleado.component';
import { FormEmpleadosComponent } from 'src/app/modales/form-empleados/form-empleados.component';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {

  _params: paramsURL = null;

  listado_datos = [];

  listado_filtros = new ListaFiltros().filtros_empleados;
  mifiltro: formatoPaginacion = null;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private fpre: FprecargadosService,
    private fmysql: FmysqlService, private router: Router) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.agregar_filtro_areas();
    this.agregar_filtro_cargos();
  }

  async agregar_filtro_areas() {
    let listado_areas = await this.fpre.listar_areas();
    let filtro_sedes: campoFiltro = {
      input: false, campo: 'idarea', nombre: 'Area',
      operadores: []
    }
    listado_areas.forEach(filtro => {
      filtro_sedes.operadores.push(
        { codigo: filtro.idarea, nombre: 'es ' + filtro.nombre, valor: " = " + filtro.idarea + " " }
      );
    })
    console.log('Nuevo Filtro:', filtro_sedes);
    this.listado_filtros.push(filtro_sedes);
  }

  async agregar_filtro_cargos() {
    let listado_areas = await this.fpre.listar_cargos();
    let filtro_sedes: campoFiltro = {
      input: false, campo: 'idcargo', nombre: 'Cargo',
      operadores: []
    }
    listado_areas.forEach(filtro => {
      filtro_sedes.operadores.push(
        { codigo: filtro.idcargo, nombre: 'es ' + filtro.nombre, valor: " = " + filtro.idcargo + " " }
      );
    })
    console.log('Nuevo Filtro:', filtro_sedes);
    this.listado_filtros.push(filtro_sedes);
  }

  exportar_excel() { }

  listar_datos(filtro: formatoPaginacion) {
    this.mifiltro = filtro;
    this.fmysql.enviar_post(environment.empleados.paginado, filtro).subscribe(res => {
      console.log('Listado Personal:', res);
      this.listado_datos = res.data;
    })
  }

  eliminar_item(iditem) {
    console.log('Eliminar:', iditem);
    this.fmysql.borrar(environment.empleados.empleados, iditem, () => {
      this.listar_datos(this.mifiltro);
    })
  }

  mostrar_cambio_clave(item?: any) {
    this.funciones.mostrar_modal(FormClaveEmpleadoComponent, 30, {
      editar: true,
      item: item,
      params: this._params
    }, () => {
      this.listar_datos(this.mifiltro);
    })
  }

  mostrar_formulario(editar: boolean, item?: any) {
    this.funciones.mostrar_modal(FormEmpleadosComponent, 40, {
      editar: editar,
      item: item,
      params: this._params
    }, () => {
      this.listar_datos(this.mifiltro);
    })
  }

}
