import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatoModificacion, paramsURL } from 'src/app/interfaces/estructuras';
import { Productos } from 'src/app/interfaces/productos';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-prod',
  templateUrl: '../crear-prod/crear-prod.component.html'
})

export class EditarProdComponent implements OnInit {

  _editando = true;
  _titulo_componente = 'Editar Producto';

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
    private fmysql: FmysqlService, private router: Router, private cdref: ChangeDetectorRef) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.listar_tipos_producto();
    this.listar_marcas();
    this.listar_unidades();
    this.buscar_item();
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  buscar_item() {
    this.fmysql.buscar_id(environment.productos._api, this._params.idsel).subscribe(res => {
      this.item = res.data[0];
    })
  }

  guardar_cambios() {
    this.funciones.iniciar_loader();
    let datos: formatoModificacion = {
      idcampo: { nombre: 'idproducto', valor: this.item.idproducto },
      campos: [
        'idtipoprod',
        'idunidad',
        'idmarca',
        'nombre',
        'precio_compra',
        'precio_venta',
        'imagen',
        'observaciones',
        'modificacion'
      ],
      valores: [
        this.item.idtipoprod,
        this.item.idunidad,
        this.item.idmarca,
        this.item.nombre,
        this.item.precio_compra,
        this.item.precio_venta,
        this.item.imagen,
        this.item.observaciones,
        'now()'
      ]
    }
    this.fmysql.modificar(environment.productos._api, datos).subscribe(res => {
      this.funciones.terminar_loader();
      console.log('Modificar Producto:', res);
      if (res.ok) {
        this.ir_a_listado();
      }
    })
  }

  ir_a_listado() {
    this._params.idsel = null;
    this.funciones.encripta(this._params).then(deco => {
      this.router.navigate(['/dash/productos', deco]);
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
    this._params.idsel = null;
    this.funciones.encripta(this._params).then(deco => {
      this.router.navigate(['dash/productos', deco]);
    })
  }

}
