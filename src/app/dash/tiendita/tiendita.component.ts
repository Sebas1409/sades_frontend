import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CajaDinero } from 'src/app/interfaces/cajadinero';
import { Clientes } from 'src/app/interfaces/clientes';
import { DetalleVenta } from 'src/app/interfaces/detalle_venta';
import { paramsURL } from 'src/app/interfaces/estructuras';
import { Pagos } from 'src/app/interfaces/pagos';
import { Productos } from 'src/app/interfaces/productos';
import { Ventas } from 'src/app/interfaces/ventas';
import { FormClienteComponent } from 'src/app/modales/form-cliente/form-cliente.component';
import { ControlesService } from 'src/app/services/controles.service';
import { FcajadineroService } from 'src/app/services/fcajadinero.service';
import { FclientesService } from 'src/app/services/fclientes.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FusuariosService } from 'src/app/services/fusuarios.service';
import { FventasService } from 'src/app/services/fventas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tiendita',
  templateUrl: './tiendita.component.html',
  styleUrls: ['./tiendita.component.scss']
})

export class TienditaComponent implements OnInit {

  _params: paramsURL = null;
  _ulogin = null;

  listado_areas = [];
  listado_productos = [];
  listado_sectores = [];

  cliente: Clientes = {
    nrodni: null,
    nombre_completo: null
  }

  venta: Ventas = {
    idventa: null,
    idcaja: null,
    idcliente: null,
    idempleado: null,
    idsector: null,
    idmatricula: null,
    tipo_doc: 0,
    serie_doc: null,
    nro_doc: null,
    fecha_doc: this.funciones.get_fecha_local()._fecha_actual,
    vigencia: null,
    creacion: null,
    modificacion: null,

    total_venta: 0
  };
  detalle_venta: DetalleVenta[] = [];

  pago: Pagos = {
    idpago: null,
    idventa: null,
    fecha_pago: this.funciones.get_fecha_local()._fecha_actual,
    metodo_pago: 1,
    monto_pago: null,
    encaja: 1,
    vigencia: null,
    creacion: null,
    modificacion: null
  }

  fprod = null;
  fsector = null;
  farea = null;

  cajaabierta: CajaDinero = {
    idcaja: null,
    idsector: null
  }

  tcliente = this.controles._requerido();

  constructor(private state: ActivatedRoute, private funciones: FuncionesService, private fmysql: FmysqlService,
    private fpre: FprecargadosService, private fusu: FusuariosService, private fven: FventasService,
    private fcaja: FcajadineroService, private fcli: FclientesService, private controles: ControlesService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    this._ulogin = await this.fusu.get_usuario_logueado();

    console.log('Uloign:', this._ulogin);
    console.log('Parametros:', this._params);

    if (this._params.idarea) {
      this.farea = this._params.idarea;
      this.listar_sectores(this.farea);
    }

    this.listado_areas = await this.fpre.listar_areas();
  }

  async seleccionar_producto(prod: Productos) {
    console.log('Prod. Seleccionado:', prod);
    let index = this.detalle_venta.findIndex(det => det.idproducto == prod.idproducto);
    if (index == -1) {
      this._agregar_nuevo_producto(prod);
    } else {
      this.detalle_venta[index].cantidad++;
      this.fven._calcular_detalle(this.detalle_venta[index]);
      console.log('Detalle Venta:', this.detalle_venta);
      this.fven._calcular_total_venta(this.venta, this.detalle_venta);
    }
  }

  async guardar_venta() {
    console.log('IDCliente:', this.cliente.idcliente);
    this.venta.idcliente = this.cliente.idcliente;
    this.pago.monto_pago = this.venta.total_venta;

    if (this.venta.idcliente && this.venta.idcaja) {
      this.fven.generar_venta(this.venta).then((idventa: number) => {
        this.fven.registrar_detalles_venta(idventa, this.detalle_venta, true, this._ulogin.idempleado, this.venta.idsector).then(det => {
          this.fven.registrar_pago(idventa, this.venta.idcaja, this.pago).then(pago => {
            this.limpiar_venta();
          });
        })
      })
    } else {
      this.funciones.mostrar_snack('Faltan algunos datos');
    }
  }

  limpiar_venta() {
    this.venta = {
      idventa: null,
      idcaja: null,
      idcliente: 1,
      idempleado: null,
      idsector: null,
      idmatricula: null,
      tipo_doc: 0,
      serie_doc: null,
      nro_doc: null,
      fecha_doc: this.funciones.get_fecha_local()._fecha_actual,
      vigencia: null,
      creacion: null,
      modificacion: null,

      total_venta: 0
    };
    this.detalle_venta = [];
    this.listado_productos = [];
  }

  eliminar_item(index: number) {
    this.detalle_venta.splice(index, 1);
    this.fven._calcular_total_venta(this.venta, this.detalle_venta);
  }

  _agregar_nuevo_producto(prod: Productos) {
    let item: DetalleVenta = {
      iddetventa: null,
      idventa: null,
      idproducto: prod.idproducto,
      descripcion: prod.nombre,
      unidad: prod.unidad,
      cantidad: 1,
      precio_compra: prod.precio_compra,
      precio_venta: prod.precio_venta,
      monto_gravado: null,
      monto_igv: null,
      monto_total: null,
      vigencia: 1,
      creacion: null
    }
    this.fven._calcular_detalle(item);
    this.detalle_venta.push(item);
    console.log('Detalle Venta:', this.detalle_venta);
    this.fven._calcular_total_venta(this.venta, this.detalle_venta);
  }

  async listar_sectores(idarea: number) {
    this.listado_sectores = (await this.fpre.buscar_sectores(idarea)).filter(dato => dato.estienda == 1);
  }

  listar_productos(idsector: number) {
    this.fcaja.verificar_caja_abierta(idsector).then(idcaja => {
      if (idcaja) {
        this.cajaabierta.idcaja = idcaja;
        this.venta.idcaja = idcaja;

        this.fmysql.listar_api(environment.productos.catalogo + idsector).subscribe(res => {
          console.log('Listado', res);
          this.listado_productos = res.data;
        })
      } else {
        this.funciones.mostrar_snack('No existe caja aperturada');
        this.cajaabierta.idcaja = null;
        this.venta.idcaja = null;
      }
    })
  }

  async buscar_cliente(nrodni: string) {
    if (nrodni) {
      if (nrodni.length > 7) {
        this.fcli.buscar_cliente_xdni(nrodni).then(res => {
          if (res) {
            this.cliente = res;
            this.cliente.nombre_completo = this.cliente.nombres.toUpperCase() + ' ' + this.cliente.apellidos.toUpperCase();
            this.venta.idcliente = this.cliente.idcliente;
          } else {
            this.registrar_cliente();
          }
        })
      } else {
        this.funciones.mostrar_snack('Ingrese un DNI correcto');
      }
    } else {
      this.funciones.mostrar_snack('Debe ingresar un DNI');
    }
  }

  async registrar_cliente() {
    this.funciones.mostrar_modal(FormClienteComponent, 50, {
      item: this.cliente.nrodni ? this.cliente.nrodni : null
    }, (idcliente) => {
      this.fcli.buscar_cliente_xid(idcliente).then(cliente => {
        console.log('Cliente Encontrado:', cliente);
        this.cliente = cliente;
        this.cliente.nombre_completo = this.cliente.nombres.toUpperCase() + ' ' + this.cliente.apellidos.toUpperCase();
        this.venta.idcliente = this.cliente.idcliente;
      })
    })
  }

}
