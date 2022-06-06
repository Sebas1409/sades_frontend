//tslint:disable
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FuncionesService } from '../services/funciones.service';
import { FusuariosService } from '../services/fusuarios.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private funciones: FuncionesService, private fusuario: FusuariosService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(res => {
      if (res instanceof HttpResponse) {
        if (res.body && res.body.msg == 'Expired token') {
          console.log(res.body.msg);
          this.funciones.mostrar_snack('Su sesión ha caducado!');
          this.fusuario.cerrar_sesion();
        }
      }
    }), catchError(err => {
      console.log('error', err);
      this.funciones.terminar_loader();
      this.funciones.mostrar_snack(err.error.mensaje);
      return throwError(err);
    }))
    
  }
}