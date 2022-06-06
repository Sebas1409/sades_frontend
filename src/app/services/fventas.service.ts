import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetalleVenta } from '../interfaces/detalle_venta';
import { formatoGuardar } from '../interfaces/estructuras';
import { Pagos } from '../interfaces/pagos';
import { Ventas } from '../interfaces/ventas';
import { FmysqlService } from './fmysql.service';
import { FuncionesService } from './funciones.service';
import { FusuariosService } from './fusuarios.service';
import { ListasSistema } from './listas-sistema';

@Injectable({
  providedIn: 'root'
})
export class FventasService {

  constructor(private funciones: FuncionesService, private fmysql: FmysqlService, private fusu: FusuariosService) { }

  registrar_pago(idventa: number, idcaja: number, pago: Pagos) {
    return new Promise((resolve) => {
      let params: formatoGuardar = {
        datos: [
          null,
          idcaja,
          idventa,
          pago.fecha_pago,
          pago.metodo_pago,
          pago.monto_pago,
          pago.encaja,
          pago.congelado,
          1, 'now()', null
        ]
      }
      this.fmysql.registrar(environment.ventas.pagos, params).subscribe(res => {
        console.log('Registro de Pago:', res);
        resolve(res.id);
      })
    })
  }

  buscar_nro_venta(tipo_doc: number): Promise<{ serie_doc: string, nro_doc: number }> {
    return new Promise((resolve) => {
      let tipos_documento = new ListasSistema().tipos_documentos_venta;
      this.fmysql.listar_api(environment.ventas.nromax + tipo_doc).subscribe(res => {
        console.log('Busqueda Nro. Doc:', res);
        let serie_doc = tipos_documento.find(item => item.codigo == tipo_doc).alias;
        let nrodoc = res.data[0].nrodoc == 0 ? 1 : res.data[0].nrodoc + 1;
        resolve({ serie_doc: serie_doc, nro_doc: nrodoc });
      })
    });
  }

  async generar_venta(venta: Ventas): Promise<number> {
    return new Promise((resolve) => {
      this.fusu.get_usuario_logueado().then(ulogin => {
        venta.idempleado = ulogin.idempleado;

        this.buscar_nro_venta(venta.tipo_doc).then(datos => {
          venta.serie_doc = datos.serie_doc;
          venta.nro_doc = datos.nro_doc;

          this.registrar_venta(venta).then(idventa => {
            resolve(idventa);
          })
        })
      })
    });
  }

  async registrar_detalles_venta(idventa: number, detalles: DetalleVenta[], descontar?: boolean, idempleado?: number, idsector?: number) {
    let params = {
      idventa: idventa,
      detalles: detalles,
      descontar: descontar ? descontar : false,
      idempleado: idempleado ? idempleado : null,
      idsector: idsector ? idsector : null
    }
    this.fmysql.enviar_post(environment.ventas.detalle_regenmasa, params).subscribe(res => {
      console.log('Registro de Detalle de Venta:', res);
      return res;
    })
  }

  registrar_venta(venta: Ventas): Promise<number> {
    return new Promise((resolve) => {
      let params: formatoGuardar = {
        datos: [
          null,
          venta.idcaja,
          venta.idcliente,
          venta.idempleado,
          venta.idsector,
          venta.idmatricula,
          venta.tipo_doc,
          venta.serie_doc,
          venta.nro_doc,
          venta.fecha_doc,
          1, 'now()', null
        ]
      }
      this.fmysql.registrar(environment.ventas._api, params).subscribe(res => {
        console.log('Registro de Venta:', res);
        if (res.ok) {
          resolve(res.id);
        } else {
          this.funciones.mostrar_snack('Ocurrio un error al registrar la Venta');
        }
      })
    })
  }

  async _calcular_detalle(item: DetalleVenta) {
    let igv = 0.18;
    let importe = item.precio_venta * item.cantidad;

    item.monto_gravado = importe / (1 + igv);
    item.monto_igv = item.monto_gravado * igv;
    item.monto_total = item.monto_gravado + item.monto_igv;
  }

  async _calcular_total_venta(venta: Ventas, detalle: DetalleVenta[]) {
    venta.total_venta = 0;
    detalle.forEach(det => {
      venta.total_venta += det.monto_total;
    })
  }

}
