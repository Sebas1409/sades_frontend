import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Empleados } from '../interfaces/empleados';
import { paramsURL } from '../interfaces/estructuras';
import { FmysqlService } from './fmysql.service';
import { FuncionesService } from './funciones.service';

@Injectable({
  providedIn: 'root'
})
export class FusuariosService {

  constructor(private router: Router, private funciones: FuncionesService, private fmysql: FmysqlService) { }

  buscar_usuario(usuario: string, clave: string, tipo: number) {
    return new Promise((resolve, reject) => {
      let datos = {
        idarea: tipo,
        usuario: usuario,
        clave: clave
      };
     // this.fmysql.enviar_post(environment.empleados.loguear, datos).subscribe(res => {
      this.fmysql.listar_api(environment.api_login + usuario + "/" + clave + "/" + tipo).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          this.funciones.mostrar_snack(res.msg);
          reject(null);
        }
      });
    });
  }

  iniciar_sesion(token: any) {
    localStorage.setItem('gymapp-token', JSON.stringify(token));
    console.log('tokennnn',token)
   // let ulogin = await this.get_usuario_logueado();
   let ulogin:any = token;
    let params: paramsURL = {
      esadmin: ulogin.nivel == 1 ? true : false,
      idarea: ulogin.idarea
    };
    this.funciones.encripta(params).then(encriptado => {
      this.router.navigate(['/dash/clientes', encriptado]);
    })
  }

  cerrar_sesion() {
    let url = '/';
    localStorage.removeItem('gymapp-token');
    this.router.navigate([url]);
  }

  async get_usuario_logueado(): Promise<Empleados> {
    return new Promise((resolve) => {
      this.funciones.desencripta(this.get_token()).then((user: any) => {
        resolve(user.data);
      });
    });
  }

  get_token() {
    return localStorage.getItem('gymapp-token');
  }

}
