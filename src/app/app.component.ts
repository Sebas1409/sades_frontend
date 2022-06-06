import { Component } from '@angular/core';
import { FmysqlService } from './services/fmysql.service';
import { FuncionesService } from './services/funciones.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent {

  constructor(private fmysql: FmysqlService, private funciones: FuncionesService) { }

}
