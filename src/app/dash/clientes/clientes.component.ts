import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})

export class ClientesComponent implements OnInit {

  _params: paramsURL = null;

  listado_filtros = new ListaFiltros().filtros_clientes;
  mifiltro: formatoPaginacion = null;

  listado_datos = [];

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private router: Router,
    private fmysql: FmysqlService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
  }

  exportar_excel() { }

  listar_datos(filtro: formatoPaginacion) {
    this.mifiltro = filtro;
    this.fmysql.enviar_post(environment.clientes.paginado, filtro).subscribe(res => {
      console.log('Listado:', res);
      this.listado_datos = res.data;
    })
  }

  entrar_a_item(editar: boolean, item?: any) {
    if (editar) {
      this._params.idsel = item.idcliente;
      this.funciones.encripta(this._params).then(deco => {
        this.router.navigate(['/dash/clientes/editar', deco]);
      })
    } else {
      this.router.navigate(['/dash/clientes/crear', this.state.snapshot.params.params]);
    }
  }

  eliminar_item(idcliente) {
    this.fmysql.borrar(environment.clientes._api, idcliente, () => {
      this.listar_datos(this.mifiltro);
    })
  }

}
