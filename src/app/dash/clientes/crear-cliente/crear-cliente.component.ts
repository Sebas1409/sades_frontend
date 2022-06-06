import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Antecedentes } from 'src/app/interfaces/antecedentes';
import { Clientes } from 'src/app/interfaces/clientes';
import { paramsURL } from 'src/app/interfaces/estructuras';
import { ControlesService } from 'src/app/services/controles.service';
import { FclientesService } from 'src/app/services/fclientes.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FusuariosService } from 'src/app/services/fusuarios.service';
import { ListasSistema } from 'src/app/services/listas-sistema';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent implements OnInit {

  _editando = false;
  _titulo_componente = 'Registrar Cliente';

  _params: paramsURL = null;

  item: Clientes = {
    idcliente: null,
    idempleado: null,
    nrodni: null,
    apellidos: null,
    nombres: null,
    fnacimiento: '1990-02-27',
    celular: null,
    domicilio: null,
    sexo: null,
    imagen: null,
    facebook: null,
    messenger: null,
    instagram: null,
    whatsapp: null,
    vigencia: null,
    creacion: null,
    modificacion: null
  };

  tnrodni = this.controles._requerido();
  tapellidos = this.controles._requerido();
  tnombres = this.controles._requerido();
  tcelular = this.controles._requerido();

  listado_sexos = new ListasSistema().tipos_sexos;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private controles: ControlesService,
    private fmysql: FmysqlService, private router: Router, private fclientes: FclientesService,
    private fusuario: FusuariosService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);
  }

  async guardar_cambios() {
    this.fusuario.get_usuario_logueado().then(ulogin => {
      this.item.idempleado = ulogin.idempleado;

      this.fclientes.registrar_cliente(this.item).then(res => {
        this.regresar_listado();
      })
    })
  }

  imagen_subida(imgup) {
    this.item.imagen = imgup.msg;
  }

  regresar_listado() {
    this.router.navigate(['dash/clientes', this.state.snapshot.params.params]);
  }

}
