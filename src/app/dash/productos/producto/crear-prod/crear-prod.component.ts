import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatoGuardar, paramsURL } from 'src/app/interfaces/estructuras';
import { Productos } from 'src/app/interfaces/productos';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-prod',
  templateUrl: './crear-prod.component.html'
})
export class CrearProdComponent implements OnInit {

  _editando = false;
  _titulo_componente = 'Registrar Producto';

  _params: paramsURL = null;

  item: Productos = {
    idproducto: null,
    idtipoprod: null,
    idunidad: null,
    idmarca: null,
    nombre: null,
    precio_compra: null,
    precio_venta: null,
    imagen: null,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null,
  };

  listado_tipos_producto = [];
  listado_marcas = [];
  listado_unidades = [];

  ttipoprod = this.controles._requerido();
  tunidad = this.controles._requerido();
  tmarca = this.controles._requerido();
  tnombre = this.controles._requerido();
  tpcompra = this.controles._requerido();
  tpventa = this.controles._requerido();

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private controles: ControlesService,
    private fmysql: FmysqlService, private router: Router) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.listar_tipos_producto();
    this.listar_marcas();
    this.listar_unidades();
  }

  guardar_cambios() {
    this.funciones.iniciar_loader();
    let datos: formatoGuardar = {
      datos: [
        null,
        this.item.idtipoprod,
        this.item.idunidad,
        this.item.idmarca,
        this.item.nombre,
        this.item.precio_compra,
        this.item.precio_venta,
        this.item.imagen,
        this.item.observaciones,
        1,
        'now()',
        null
      ]
    }
    this.fmysql.registrar(environment.productos._api, datos).subscribe(res => {
      this.funciones.terminar_loader();
      console.log('Guardar Producto:', res);
      if (res.ok) {
        this.ir_a_editar(res.id);
      }
    })
  }

  ir_a_editar(idprod: number) {
    this._params.idsel = idprod;
    this.funciones.encripta(this._params).then(deco => {
      this.router.navigate(['/dash/productos/editar', deco]);
    })
  }

  imagen_subida(imgup) {
    this.item.imagen = imgup.msg;
  }

  listar_tipos_producto() {
    this.fmysql.listar(environment.productos.tipos_producto).subscribe(res => {
      this.listado_tipos_producto = res.data;
    })
  }

  listar_marcas() {
    this.fmysql.listar(environment.productos.marcas).subscribe(res => {
      this.listado_marcas = res.data;
    })
  }

  listar_unidades() {
    this.fmysql.listar(environment.productos.unidades).subscribe(res => {
      this.listado_unidades = res.data;
    })
  }

  regresar_listado() {
    this.router.navigate(['dash/productos', this.state.snapshot.params.params]);
  }

}
