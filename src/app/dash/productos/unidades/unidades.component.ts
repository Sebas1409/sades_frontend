import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paramsURL } from 'src/app/interfaces/estructuras';
import { FormUnidadesComponent } from 'src/app/modales/form-unidades/form-unidades.component';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html'
})
export class UnidadesComponent implements OnInit {

  _params: paramsURL = null;

  listado_datos = [];

  ftexto = null;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private fpre: FprecargadosService,
    private fmysql: FmysqlService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);
    this.listar_datos();
  }

  exportar_excel() {
    this.listar_datos();
  }

  listar_datos() {
    this.fmysql.listar(environment.productos.unidades).subscribe(res => {
      this.listado_datos = res.data;
    })
  }

  mostrar_modal_formulario(editar: boolean, item?: any) {
    this.funciones.mostrar_modal(FormUnidadesComponent, 30, {
      editar: editar,
      item: item
    }, () => {
      this.listar_datos();
    })
  }

  eliminar_item(iditem) {
    console.log('Eliminar:', iditem);
    this.fmysql.borrar(environment.productos.unidades, iditem, () => {
      this.listar_datos();
    })
  }

}
