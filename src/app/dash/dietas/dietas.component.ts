import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { campoFiltro, formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FormDietasComponent } from 'src/app/modales/form-dietas/form-dietas.component';
import { FormServiciosComponent } from 'src/app/modales/form-servicios/form-servicios.component';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html'
})

export class DietasComponent implements OnInit {

  _params: paramsURL = null;

  listado_datos = [];

  listado_filtros = new ListaFiltros().filtros_basicos;
  mifiltro: formatoPaginacion = null;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private fpre: FprecargadosService,
    private fmysql: FmysqlService, private router: Router) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.listar_datos();
  }

  exportar_excel() { }

  listar_datos() {
    this.fmysql.listar(environment.historico.dietas).subscribe(res => {
      console.log('Listado:', res);
      this.listado_datos = res.data;
    })
  }

  eliminar_item(iditem) {
    console.log('Eliminar:', iditem);
    this.fmysql.borrar(environment.historico.dietas, iditem, () => {
      this.listar_datos();
    })
  }

  entrar_a_item(editar: boolean, item?: any) {
    if (editar) {
      this._params.idsel = item.iddieta;
      this.funciones.encripta(this._params).then(deco => {
        this.router.navigate(['/dash/dietas/editar', deco]);
      })
    } else {
      this.router.navigate(['/dash/dietas/crear', this.state.snapshot.params.params]);
    }
  }

}
