//tslint:disable
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FusuariosService } from '../services/fusuarios.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private fusuario: FusuariosService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   /* let token = this.fusuario.get_token();
    if (token) {
      request = request.clone({
        setHeaders: {
          'auth-token': token
        }
      });
    } else {
      console.log('No hay token!');
    }*/

    return next.handle(request);
   
  }

}