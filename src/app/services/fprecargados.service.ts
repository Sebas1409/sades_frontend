import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Areas } from '../interfaces/areas';
import { Cargos } from '../interfaces/cargos';
import { respuestaAPI } from '../interfaces/estructuras';
import { MotivoMovimiento } from '../interfaces/motivo_movimiento';
import { Sectores } from '../interfaces/sectores';
import { FmysqlService } from './fmysql.service';
import { FuncionesService } from './funciones.service';

@Injectable({
  providedIn: 'root'
})
export class FprecargadosService {

  constructor(private fmysql: FmysqlService, private funciones: FuncionesService) { }

  listar_motivos_kardex(): Promise<MotivoMovimiento[]> {
    return new Promise((resolve) => {
      this.fmysql.listar(environment.precargados.motivo_movimiento).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          console.error('Error: ', res.msg)
        }
      })
    });
  }

  listar_estados_matricula(): Promise<MotivoMovimiento[]> {
    return new Promise((resolve) => {
      this.fmysql.listar(environment.precargados.estados_matricula).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          console.error('Error: ', res.msg)
        }
      })
    });
  }

  listar_areas(): Promise<Areas[]> {
    return new Promise((resolve) => {
      this.fmysql.listar(environment.precargados.areas).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          console.error('Error: ', res.msg)
        }
      })
    });
  }

  listar_area(idarea: number): Promise<Areas[]> {
    return new Promise((resolve) => {
      if (idarea) {
        this.fmysql.buscar_id(environment.precargados.areas, idarea).subscribe(res => {

          if (res.ok) {
            resolve(res.data[0]);
          } else {
            console.error('Error: ', res.msg)
          }
        })
      } else {
        resolve(null);
      }
    });
  }

  listar_sectores(): Promise<Sectores[]> {
    return new Promise((resolve) => {
      this.fmysql.listar(environment.precargados.sectores).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          console.error('Error: ', res.msg)
        }
      })
    });
  }

  buscar_sectores(idarea: number): Promise<Sectores[]> {
    return new Promise((resolve) => {
      this.fmysql.buscar_campo(environment.precargados.sectores, 'idarea', idarea).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          console.error('Error: ', res.msg)
        }
      })
    });
  }

  listar_cargos(): Promise<Cargos[]> {
    return new Promise((resolve) => {
      this.fmysql.listar(environment.precargados.cargos).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          console.error('Error: ', res.msg)
        }
      })
    });
  }

}
