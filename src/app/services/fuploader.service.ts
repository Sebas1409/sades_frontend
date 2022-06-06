//tslint:disable
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FuncionesService } from './funciones.service';

@Injectable({
  providedIn: 'root'
})
export class FuploaderService {

  constructor(private http: HttpClient, private funciones: FuncionesService) { }

  _subir_imagen(event: FileList, ubicacion: string) {
    let promesa = new Promise((resolve, reject) => {
      const file = event.item(0);
      let peso_mb = file.size / (1024 * 1000);

      if (peso_mb > 1) {
        this.funciones.mostrar_snack("El peso máximo es de 1MB");
        reject({ ok: false, msg: 'Mucho pesa' });
      }

      console.log('Tipo de Archivo:', file.type);
      if (file.type.split('/')[0] !== 'image') {
        this.funciones.mostrar_snack("El archivo seleccionado no es una imagen");
        reject({ ok: false, msg: 'No es una imagen' });
      }

      const formData = new FormData();
      formData.append('ubicacion', ubicacion);
      formData.append('file', file);

      const headers = new HttpHeaders();
      this.http.post(environment.url_servidor + environment.uploads._api, formData, {
        headers,
        responseType: 'json'
      }).subscribe((res: any) => {
        if (res.ok) {
          resolve({ ok: true, msg: environment.url_servidor + environment.uploads.path + res.nombre });
        } else {
          reject(null);
        }
      });
    });

    return promesa;
  }

}
