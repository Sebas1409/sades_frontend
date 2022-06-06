import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CajaDinero } from '../interfaces/cajadinero';
import { formatoGuardar, formatoModificacion } from '../interfaces/estructuras';
import { FmysqlService } from './fmysql.service';
import { FuncionesService } from './funciones.service';

@Injectable({
  providedIn: 'root'
})
export class FcajadineroService {

  constructor(private fmysql: FmysqlService, private funciones: FuncionesService) { }

  aperturar_caja(idsector: number, monto: number): Promise<number> {
    return new Promise((resolve, reject) => {
      let datos: formatoGuardar = {
        datos: [
          null,
          idsector,
          this.funciones.get_fecha_local()._fecha_actual,
          this.funciones.get_fecha_local()._hora_actual,
          monto,
          null, //fecha_cierre,
          null, //hora_cierre,
          null, //monto_cierre,
          1, 'now()', null
        ]
      }
      this.fmysql.registrar(environment.cajas._api, datos).subscribe(res => {
        if (res.ok) {
          this.funciones.mostrar_snack('Caja aperturada correctamente');
          resolve(res.id);
        } else {
          this.funciones.mostrar_snack(res.msg);
          reject(null);
        }
      })
    });
  }

  cerrar_caja(idcaja: number, monto: number) {
    return new Promise((resolve, reject) => {
      let datos: formatoModificacion = {
        idcampo: { nombre: 'idcaja', valor: idcaja },
        campos: [
          'fecha_cierre',
          'hora_cierre',
          'monto_cierre',
          'modificacion'
        ],
        valores: [
          this.funciones.get_fecha_local()._fecha_actual,
          this.funciones.get_fecha_local()._hora_actual,
          monto,
          'now()'
        ]
      }
      this.fmysql.modificar(environment.cajas._api, datos).subscribe(res => {
        if (res.ok) {
          this.funciones.mostrar_snack('Caja cerrada correctamente');
          resolve(res.id);
        } else {
          this.funciones.mostrar_snack(res.msg);
          reject(null);
        }
      })
    });
  }

  verificar_caja_abierta(idsector: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.fmysql.listar_api(environment.cajas.verificar + idsector).subscribe(res => {
        if (res.ok) {
          if (res.data.length == 1) {
            resolve(res.data[0].idcaja);
          } else {
            this.funciones.mostrar_snack('No se encontraron Cajas Aperutadas');
            resolve(null);
          }
        } else {
          this.funciones.mostrar_snack(res.msg);
          reject(null);
        }
      })
    })
  }

}
