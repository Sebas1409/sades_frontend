import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FmysqlService } from './fmysql.service';

@Injectable({
  providedIn: 'root'
})
export class FstockService {

  constructor(private fmysql: FmysqlService) { }

  buscar_stock_xsector(idprod: number, idsector: number): Promise<number> {
    return new Promise((resolve) => {
      this.fmysql.listar_api(environment.productos.stockxsector + idprod + '/' + idsector).subscribe(res => {
        resolve(res.data[0].stock_actual);
      })
    });
  }

  buscar_stock_xarea(idprod: number, idarea: number): Promise<number> {
    return new Promise((resolve) => {
      this.fmysql.listar_api(environment.productos.stockxsector + idprod + '/' + idarea).subscribe(res => {
        resolve(res.data[0].stock_actual);
      })
    });
  }

}
