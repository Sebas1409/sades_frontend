import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { campoFiltro, formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FormServiciosComponent } from 'src/app/modales/form-servicios/form-servicios.component';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements OnInit {

  _params: paramsURL = null;

  listado_datos = [];

  listado_filtros = new ListaFiltros().filtros_basicos;
  mifiltro: formatoPaginacion = null;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private fpre: FprecargadosService,
    private fmysql: FmysqlService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.agregar_filtro_sectores();
  }

  exportar_excel() { }

  async agregar_filtro_sectores() {
    let listado_areas = await this.fpre.listar_sectores();
    let filtro_sedes: campoFiltro = {
      input: false, campo: 'idsector', nombre: 'Sector',
      operadores: []
    }
    listado_areas.forEach(filtro => {
      filtro_sedes.operadores.push(
        { codigo: filtro.idsector, nombre: 'es ' + filtro.nombre, valor: " = " + filtro.idsector + " " }
      );
    })
    console.log('Nuevo Filtro:', filtro_sedes);
    this.listado_filtros.push(filtro_sedes);
  }

  listar_datos(filtro: formatoPaginacion) {
    this.mifiltro = filtro;
    this.fmysql.enviar_post(environment.servicios.paginado, filtro).subscribe(res => {
      console.log('Listado:', res);
      this.listado_datos = res.data;
    })
  }

  mostrar_modal_formulario(editar: boolean, item?: any) {
    this.funciones.mostrar_modal(FormServiciosComponent, 40, {
      editar: editar,
      idarea: this._params.idarea,
      item: item
    }, () => {
      this.listar_datos(this.mifiltro);
    })
  }

  eliminar_item(iditem) {
    console.log('Eliminar:', iditem);
    this.fmysql.borrar(environment.servicios._api, iditem, () => {
      this.listar_datos(this.mifiltro);
    })
  }

}
