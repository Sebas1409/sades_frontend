import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { formatoGuardar, formatoModificacion, formatoPaginacion, respuestaAPI } from '../interfaces/estructuras';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from '../modales/modal-confirmacion/modal-confirmacion.component';

@Injectable({
  providedIn: 'root'
})
export class FmysqlService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  listar_api(urlapi: string) {
    let url = environment.url_servidor + urlapi;
    console.warn("URL API: [" + url + "]");
    return this.http.get<respuestaAPI>(url);
  }

  listar(urlapi: string) {
    let url = environment.url_servidor + urlapi + "listar/";
    console.warn("URL API: [" + url + "]");
    return this.http.get<respuestaAPI>(url);
  }

  buscar_id(urlapi: string, id: number) {
    let url = environment.url_servidor + urlapi + "buscar/" + id;
    console.warn("URL API: [" + url + "]");
    return this.http.get<respuestaAPI>(url);
  }

  buscar_campo(urlapi: string, campo: string, valor: string | number) {
    let url = environment.url_servidor + urlapi + "buscar/" + campo + "/" + valor;
    console.warn("URL API: [" + url + "]");
    return this.http.get<respuestaAPI>(url);
  }

  registrar(urlapi: string, data: formatoGuardar) {
    let url = environment.url_servidor + urlapi + "guardar/";
    console.warn("URL API: [" + url + "]");
    let ndata = JSON.stringify(data);
    return this.http.post<respuestaAPI>(url, ndata);
  }

  enviar_post(urlapi: string, item: any) {
    let url = environment.url_servidor + urlapi;
    console.warn("URL API: [" + url + "]");
    let ndata = JSON.stringify(item);
    return this.http.post<respuestaAPI>(url, ndata);
  }

  listar_paginacion(urlapi: string, data: formatoPaginacion) {
    let url = environment.url_servidor + urlapi;
    console.warn("URL API: [" + url + "]");
    let ndata = JSON.stringify(data);
    return this.http.post<respuestaAPI>(url, ndata);
  }

  encriptado_jwt_old(item: any) {
    return new Promise((resolve, reject) => {
      let url = environment.url_servidor + environment.jwt.encriptado;
      console.warn("URL API: [" + url + "]");
      let ndata = JSON.stringify(item);
      this.http.post<respuestaAPI>(url, ndata).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          reject(null);
        }
      });
    });
  }

  encriptado_jwt(cadena: any): Promise<respuestaAPI> {
    let url = environment.url_servidor + environment.jwt.encriptado;
    console.warn("URL API: [" + url + "]");
    let ndata = JSON.stringify({token: cadena});
    return this.http.post<respuestaAPI>(url, ndata).toPromise().then(res=>res.data[0]);
  }

  desencriptado_jwt(item: any) {
    return new Promise((resolve, reject) => {
      let url = environment.url_servidor + environment.jwt.desencriptado;
      console.warn("URL API: [" + url + "]");
      let ndata = JSON.stringify(item);
      this.http.post<respuestaAPI>(url, ndata).subscribe(res => {
        if (res.ok) {
          resolve(res.data);
        } else {
          reject(res.msg);
        }
      });
    });
  }

  subir_imagen(urlapi: string, file: File) {
    let url = environment.url_servidor + urlapi;
    if (!environment.production) {
      console.warn('Archivo a Subir:', file);
    }
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders().set('Content-Type', []);
    return this.http.post(url, formData, {
      headers,
    });
  }

  modificar(urlapi: string, data: formatoModificacion) {
    let url = environment.url_servidor + urlapi + "modificar/";
    console.warn("URL API: [" + url + "]");
    let ndata = JSON.stringify(data);
    return this.http.put<respuestaAPI>(url, ndata);
  }

  borrar(urlapi: string, id: number, callback: (res?: any) => void) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      data: { item: null },
      panelClass: ['panel-modal', 'panel-modal-30']
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let url = environment.url_servidor + urlapi + "borrar/" + id;
        console.warn("URL API: [" + url + "]");
        this.http.delete<respuestaAPI>(url).subscribe(result => {
          callback(result);
        })
      } else {
        console.log('No se ejecuto nada');
      }
    });
  }

}
