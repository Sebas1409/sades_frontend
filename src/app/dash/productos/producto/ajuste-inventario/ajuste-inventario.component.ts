import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paramsURL } from 'src/app/interfaces/estructuras';
import { FormAjusteInventarioComponent } from 'src/app/modales/form-ajuste-inventario/form-ajuste-inventario.component';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ajuste-inventario',
  templateUrl: './ajuste-inventario.component.html'
})
export class AjusteInventarioComponent implements OnInit {

  @Input() idproducto: number = null;

  _params: paramsURL = null;

  listado_datos = [];

  total_stock = 0;

  constructor(private fmysql: FmysqlService, private funciones: FuncionesService, private state: ActivatedRoute) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);

    this.listar_kardex_producto();
  }

  listar_kardex_producto() {
    this.fmysql.listar_api(environment.productos.kardex_historial + this.idproducto).subscribe(res => {
      console.log('Respuesta API:', res);
      this.listado_datos = res.data;
      this.calcular_totales();
    })
  }

  calcular_totales() {
    this.total_stock = 0;
    this.listado_datos.forEach(dato => {
      this.total_stock += dato.stock_actual;
    })
  }

  modal_ajuste_inventario() {
    this.funciones.mostrar_modal(FormAjusteInventarioComponent, 50, {
      editar: false,
      item: null,
      idarea: this._params.idarea,
      params: this.idproducto
    }, () => {
      this.ngOnInit();
    })
  }

}
