import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { paraModal, campoFiltro, paramsURL } from '../interfaces/estructuras';
import { ModalConfirmacionComponent } from '../modales/modal-confirmacion/modal-confirmacion.component';
import { FmysqlService } from './fmysql.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(private snack: MatSnackBar, private slim: LoadingBarService, private dialog: MatDialog,
    private fmysql: FmysqlService, private router: Router) { }

  parametros_url(params: string): Promise<paramsURL> {
    return new Promise((resolve) => {
      this.desencripta(params).then((deco: paramsURL) => {
        resolve(deco);
      })
    })
  }

  redireccionar(uri: string, params: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri, params]));
  }

  get_navegador() {
    let navegador = {
      appname: navigator.appName,
      codeName: navigator.appCodeName,
      platform: navigator.platform,
      eswin: navigator.platform.toLowerCase().indexOf("win") == -1 ? false : true,
      esmac: navigator.platform.toLowerCase().indexOf("mac") == -1 ? false : true
    };
    return navegador;
  }

  verificar_campo(item: any): boolean {
    return (!item || item == 'null') ? false : true;
  }

  quitar_guiones(nombre: string) {
    return String(nombre).toLowerCase().replace(/-/g, " ");
  }

  generar_nombre_codigo(nombre: string) {
    return String(nombre).toLowerCase().replace(/ /g, "_");
  }

  private _color_hexadecimal_a_rgba(colhex: string, alfa?: number) {
    let c;
    let hex = colhex ? colhex : "#CCCCCC";
    let _alfa = alfa ? alfa : 1;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + _alfa + ')';
    }
    throw new Error('Bad Hex');
  }

  generar_color_calendario(hex: string) {
    let primario = this._color_hexadecimal_a_rgba(hex);
    let secundario = this._color_hexadecimal_a_rgba(hex, 0.2);
    return { primary: primario, secondary: secundario };
  }

  generar_filtro(campo: campoFiltro, cod_operador: number, valor: string) {
    let operador = campo.operadores.find(ope => ope.codigo == cod_operador);
    if (campo.input) {
      if (valor) {
        if (operador.codigo == 5) {
          return { chip: campo.nombre + ' ' + operador.nombre + ' ' + valor, sql: campo.campo + operador.valor + valor + "%' " };
        } else {
          return { chip: campo.nombre + ' ' + operador.nombre + ' ' + valor, sql: campo.campo + operador.valor + "'" + valor + "' " };
        }
      } else {
        this.mostrar_snack('Debe ingresar un valor!');
        return null;
      }
    } else {
      return { chip: campo.nombre + ' ' + operador.nombre, sql: campo.campo + operador.valor };
    }
  };

  encripta(cadena: any) {
    const item = {
      token: cadena
    };
    return this.fmysql.encriptado_jwt_old(item);
  }

  desencripta(cadena: any) {
    const item = {
      token: cadena
    };
    return this.fmysql.desencriptado_jwt(item);
  }

  mostrar_modal_confirmacion(texto: string, acepta?: (res?: any) => void, rechaza?: (res?: any) => void) {
    this.mostrar_modal(ModalConfirmacionComponent, 30, {
      item: texto
    }, acepta, rechaza);
  }

  mostrar_modal(modal: any, ancho: number, params: paraModal, resolve?: (res?: any) => void, reject?: (res?: any) => void) {
    let miancho = "panel-modal-" + ancho;
    const dialogRef = this.dialog.open(modal, {
      panelClass: ['panel-modal', miancho],
      data: params,
      disableClose: params.cerrable ? true : false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        resolve(result);
      } else {
        if (reject) {
          reject(result);
        }
      }
    });
  }

  mostrar_snack(msg: string) {
    this.snack.open(msg, null, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    });
  }

  iniciar_loader() {
    this.slim.start();
  }

  terminar_loader() {
    this.slim.complete();
  }

  get_igv(): number {
    return 18.00;
  }

  poner_ceros(num: number, tamanio: number): string {
    let minumero = String(num);
    while (minumero.length < tamanio) {
      minumero = '0' + minumero;
    }
    return minumero;
  }

  redondear(numero: number, decimales?: number): number {
    return Number(numero.toFixed(decimales));
  }

  get_fecha_local(fecha?: Date) {
    let dt = fecha ? fecha : new Date();
    let localDate = dt;

    let gmt = localDate;
    let min = gmt.getTime() / 1000 / 60; // convert gmt date to minutes
    let localNow = new Date().getTimezoneOffset(); // get the timezone
    let localTime = min - localNow; // get the local time
    let dateStr = new Date(localTime * 1000 * 60);

    let fecha_real = dateStr.toISOString();
    let fechas = {
      _fecha_actual: fecha_real.substr(0, 10),
      _hora_actual: fecha_real.substring(11, 19),
      _date_mysql: fecha_real.substr(0, 10) + " " + fecha_real.substring(11, 19),
      _para_bitacora: dateStr
    };
    return fechas;
  }

  getPeriodoLectivoActual() {
    return {
      anio: Number(localStorage.getItem("sades_periodo_lectivo"))
    }
  }
}
