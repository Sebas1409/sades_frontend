import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { campoFiltro, formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FormServiciosComponent } from 'src/app/modales/form-servicios/form-servicios.component';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  _params: paramsURL = null;

  listado_datos = [];

  listado_filtros = new ListaFiltros().filtros_basicos;
  mifiltro: formatoPaginacion = null;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private fpre: FprecargadosService,
    private fmysql: FmysqlService, private router: Router) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.agregar_filtro_tipo_producto();
    this.agregar_filtro_marcas();
  }

  exportar_excel() { }

  async agregar_filtro_marcas() {
    this.fmysql.listar(environment.productos.marcas).subscribe(res => {
      let filtro_sedes: campoFiltro = {
        input: false, campo: 'idmarca', nombre: 'Marca',
        operadores: []
      }
      res.data.forEach(filtro => {
        filtro_sedes.operadores.push(
          { codigo: filtro.idmarca, nombre: 'es ' + filtro.nombre, valor: " = " + filtro.idmarca + " " }
        );
      })
      console.log('Nuevo Filtro:', filtro_sedes);
      this.listado_filtros.push(filtro_sedes);
    })
  }

  async agregar_filtro_tipo_producto() {
    this.fmysql.listar(environment.productos.tipos_producto).subscribe(res => {
      let filtro_sedes: campoFiltro = {
        input: false, campo: 'idtipoprod', nombre: 'Tipo de Producto',
        operadores: []
      }
      res.data.forEach(filtro => {
        filtro_sedes.operadores.push(
          { codigo: filtro.idtipoprod, nombre: 'es ' + filtro.nombre, valor: " = " + filtro.idtipoprod + " " }
        );
      })
      console.log('Nuevo Filtro:', filtro_sedes);
      this.listado_filtros.push(filtro_sedes);
    })
  }

  listar_datos(filtro: formatoPaginacion) {
    this.mifiltro = filtro;
    this.fmysql.enviar_post(environment.productos.paginado, filtro).subscribe(res => {
      console.log('Listado:', res);
      this.listado_datos = res.data;
    })
  }

  eliminar_item(iditem) {
    console.log('Eliminar:', iditem);
    this.fmysql.borrar(environment.productos._api, iditem, () => {
      this.listar_datos(this.mifiltro);
    })
  }

  entrar_a_item(editar: boolean, item?: any) {
    if (editar) {
      this._params.idsel = item.idproducto;
      this.funciones.encripta(this._params).then(deco => {
        this.router.navigate(['/dash/productos/editar', deco]);
      })
    } else {
      this.router.navigate(['/dash/productos/crear', this.state.snapshot.params.params]);
    }
  }

}
