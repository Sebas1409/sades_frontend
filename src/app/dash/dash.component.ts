import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paramsURL } from '../interfaces/estructuras';
import { ModalReportesComponent } from '../modales/modal-reportes/modal-reportes.component';
import { FclientesService } from '../services/fclientes.service';
import { FmatriculasService } from '../services/fmatriculas.service';
import { FmysqlService } from '../services/fmysql.service';
import { FuncionesService } from '../services/funciones.service';
import { FusuariosService } from '../services/fusuarios.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  nombre_modulo = "Principal";

  ulogin = { nivel: 1, idarea: 1, nombre_completo: 'Sebas', cargo: 'Administrador' };
  menu_sidenav = [];

  menu_administrador = [
    { nombre: 'Pto. de Venta', link: '/dash/ptoventa', icono: 'fa-user-md', params: true },
    { nombre: 'Caja Diaria', link: '/dash/caja-diaria', icono: 'fa-money', params: true },
    { nombre: 'Clientes', link: '/dash/clientes', icono: 'fa-user-md', params: true },
    { nombre: 'Matriculas', link: '/dash/matriculas', icono: 'fa-user-md', params: true },
    { nombre: 'Registro Anotaciones', link: '/dash/anotaciones', icono: 'fa-user-md', params: false },
    { nombre: 'Registro Asistencia', link: '/dash/asistencia', icono: 'fa-user-md', params: false },
    { nombre: 'Eventos Examenes', link: '/dash/eventos-examen', icono: 'fa-user-md', params: false },
    { nombre: 'Asignación Examenes', link: '/dash/eventos-examen/asignacion', icono: 'fa-user-md', params: false },
    { nombre: 'Personal', link: '/dash/personal', icono: 'fa-user-md', params: true },
    { nombre: 'Servicios', link: '/dash/servicios', icono: 'fa-user-md', params: true },
    { nombre: 'Marcas', link: '/dash/marcas', icono: 'fa-user-md', params: true },
    { nombre: 'Unidades', link: '/dash/unidades', icono: 'fa-user-md', params: true },
    { nombre: 'Tipos Producto', link: '/dash/tipos-producto', icono: 'fa-user-md', params: true },
    { nombre: 'Productos', link: '/dash/productos', icono: 'fa-user-md', params: true },
    { nombre: 'Dietas', link: '/dash/dietas', icono: 'fa-user-md', params: true }
  ];

  menu_vendedor = [
    { nombre: 'Pto. de Venta', link: '/dash/ptoventa', icono: 'fa-user-md', params: true },
    { nombre: 'Caja Diaria', link: '/dash/caja-diaria', icono: 'fa-money', params: true },
    { nombre: 'Clientes', link: '/dash/clientes', icono: 'fa-user-md', params: true },
    { nombre: 'Matriculas', link: '/dash/matriculas', icono: 'fa-user-md', params: true },
    { nombre: 'Dietas', link: '/dash/dietas', icono: 'fa-user-md', params: true }
  ];

  constructor(private fusuario: FusuariosService, private funciones: FuncionesService, private router: Router,
    private fcli: FclientesService, private fmat: FmatriculasService, private fmysql: FmysqlService) { }

  async ngOnInit() {
    // console.log(await this.fusuario.get_usuario_logueado());
    this.validar_usuario();

  }

  buscar_cliente(nrodoc: string) {
    console.log('Nro Doc:', nrodoc);
    this.fmat.buscar_matricula_x_nrodoc(nrodoc).then(mats => {
      console.log('Matriculas:', mats);
      if (mats.length == 0) {
        this.funciones.mostrar_snack('El Nro. DOC. no cuenta con matrículas activas');
      } else if (mats.length == 1) {
        let _params: paramsURL = {
          esadmin: null,
          finicio: this.funciones.get_fecha_local()._fecha_actual,
          ffinal: this.funciones.get_fecha_local()._fecha_actual,
          idarea: null,
          idsel: mats[0].idmatricula
        };
        this.funciones.encripta(_params).then(deco => {
          this.router.navigate(['/dash/matriculas/editar', deco]);
        })
      } else {
        this.funciones.mostrar_snack('El Nro. DOC. tiene varias matrículas activas!');
      }
    })
  }

  entrar_a_url(menu) {
    let params: paramsURL = {
      esadmin: this.ulogin.nivel == 1 ? true : false,
      idarea: this.ulogin.idarea
    };
    if (menu.params) {
      this.fmysql.encriptado_jwt(params).then(encriptado => {
        console.log('encri', encriptado)
        this.router.navigate([menu.link, encriptado]);
      })
    }else{
      this.router.navigate([menu.link]);
    }
  }

  validar_usuario() {
    // this.fusuario.get_usuario_logueado().then(ulogin => {
    //console.log('Ulogin:', ulogin);
    //this.ulogin = ulogin;
    console.log(this.ulogin)
    if (this.ulogin.nivel == 1) {
      this.menu_sidenav = this.menu_administrador;
    } else {
      this.menu_sidenav = this.menu_vendedor;
    }
    //})
  }

  mostrar_listado_reportes() {
    this.funciones.mostrar_modal(ModalReportesComponent, 30, {}, () => { })
  }

  cerrar_sesion() {
    this.fusuario.cerrar_sesion();
  }

}
