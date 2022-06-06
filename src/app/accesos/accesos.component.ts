import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ControlesService } from '../services/controles.service';
import { FmysqlService } from '../services/fmysql.service';
import { FuncionesService } from '../services/funciones.service';
import { FusuariosService } from '../services/fusuarios.service';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.scss']
})
export class AccesosComponent implements OnInit {

  login = {
    idarea: 1,
    usuario: null,
    clave: null
  };

  tusuario = this.controles._requerido();
  tclave = this.controles._requerido();
  tarea = this.controles._requerido();

  token = null;
  listado_areas = [];

  constructor(private funciones: FuncionesService, private router: Router, private controles: ControlesService,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private fusuario: FusuariosService) { }

  ngOnInit() {
    this.listar_areas();
  }

  listar_areas() {
    this.fmysql.listar(environment.precargados.areas).subscribe(res => {
      console.log('Areas:', res.data);
      this.listado_areas = res.data;
    })
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  buscar_usuario() {
    this.funciones.iniciar_loader();
    this.fusuario.buscar_usuario(this.login.usuario, this.login.clave, this.login.idarea).then((res: any) => {
      console.log('Buscar emp:', res);
      this.funciones.terminar_loader();
      this.fusuario.iniciar_sesion(res.data[0]);
    }).catch(err => {
      this.funciones.terminar_loader();
    });
  }

}
