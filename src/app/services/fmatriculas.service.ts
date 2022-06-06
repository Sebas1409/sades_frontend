import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatoGuardar, formatoModificacion } from '../interfaces/estructuras';
import { Matriculas } from '../interfaces/matriculas';
import { FmysqlService } from './fmysql.service';
import { FuncionesService } from './funciones.service';

@Injectable({
  providedIn: 'root'
})
export class FmatriculasService {

  public $matriculas = new BehaviorSubject<any[]>(null);

  constructor(private funciones: FuncionesService, private fmysql: FmysqlService) { }

  buscar_medidas(idmat: number) {
    return new Promise((resolve) => {
      this.fmysql.buscar_campo(environment.historico.medidas, 'idmatricula', idmat).subscribe(res => {
        console.log('Medidas de Matricula:', res);
        if (res.ok) {
          resolve(res.data);
        }
      })
    })
  }

  buscar_imagenes(idmat: number) {
    return new Promise((resolve) => {
      this.fmysql.buscar_campo(environment.historico.imagenes, 'idmatricula', idmat).subscribe(res => {
        console.log('Imagenes de Matricula:', res);
        if (res.ok) {
          resolve(res.data);
        }
      })
    })
  }

  buscar_dietas(idmat: number) {
    return new Promise((resolve) => {
      this.fmysql.buscar_campo(environment.historico.dietas_asignadas, 'idmatricula', idmat).subscribe(res => {
        console.log('Dietas de Matricula:', res);
        if (res.ok) {
          resolve(res.data);
        }
      })
    })
  }

  buscar_asistencias(idmat: number) {
    return new Promise((resolve) => {
      this.fmysql.buscar_campo(environment.matriculas.asistencia, 'idmatricula', idmat).subscribe(res => {
        console.log('Asistencias de Matricula:', res);
        if (res.ok) {
          resolve(res.data);
        }
      })
    })
  }

  buscar_pagos(idmat: number) {
    return new Promise((resolve) => {
      this.fmysql.buscar_campo(environment.ventas.pagos, 'idmatricula', idmat).subscribe(res => {
        console.log('Pagos de Matricula:', res);
        if (res.ok) {
          resolve(res.data);
        }
      })
    })
  }

  buscar_matricula_x_nrodoc(nrodoc: string): Promise<any[]> {
    return new Promise((resolve) => {
      this.fmysql.listar_api(environment.matriculas.matxnrodoc + nrodoc).subscribe(res => {
        console.log('Matriculas encontradas:', res);
        resolve(res.data);
      })
    });
  }

  buscar_matricula(idmat: number) {
    return new Promise((resolve) => {
      this.fmysql.buscar_id(environment.matriculas._api, idmat).subscribe(res => {
        console.log('Matricula encontrada:', res);
        resolve(res.data[0]);
      })
    });
  }

  registrar_matricula(mat: Matriculas): Promise<number> {
    return new Promise((resolve) => {
      this.funciones.iniciar_loader();
      let datos: formatoGuardar = {
        datos: [
          null,
          mat.idservicio,
          mat.idcliente,
          mat.idempleado,
          mat.idestadomat,
          mat.idcaja,
          mat.fmatricula,
          mat.precio_mat,
          mat.diasextra,
          mat.observaciones,
          1,
          'now()',
          null
        ]
      }
      this.fmysql.registrar(environment.matriculas._api, datos).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Guardar Matricula:', res);
        if (res.ok) {
          resolve(res.id);
        }
      })
    })
  }

  agregar_dias_extra(mat: Matriculas, diasextra: number): Promise<number> {
    return new Promise((resolve) => {
      this.funciones.iniciar_loader();
      let datos: formatoModificacion = {
        idcampo: { nombre: 'idmatricula', valor: mat.idmatricula },
        campos: [
          'diasextra',
          'modificacion'
        ],
        valores: [
          diasextra,
          'now()',
        ]
      }
      this.fmysql.modificar(environment.matriculas._api, datos).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Guardar Matricula:', res);
        if (res.ok) {
          resolve(res.id);
        }
      })
    })
  }

  cambiar_estado_matricula(mat: Matriculas): Promise<number> {
    return new Promise((resolve) => {
      this.funciones.iniciar_loader();
      let datos: formatoModificacion = {
        idcampo: { nombre: 'idmatricula', valor: mat.idmatricula },
        campos: [
          'idestadomat',
          'modificacion'
        ],
        valores: [
          mat.idestadomat,
          'now()',
        ]
      }
      this.fmysql.modificar(environment.matriculas._api, datos).subscribe(res => {
        this.funciones.terminar_loader();
        console.log('Guardar Matricula:', res);
        if (res.ok) {
          resolve(res.id);
        }
      })
    })
  }


  postMatriculas(item:any){
    console.log('entro',item)
    this.$matriculas.next(item)
  }

  getMatriculas(): Observable<any>{
   return this.$matriculas.asObservable();
  }
}
