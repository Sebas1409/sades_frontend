import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: '../crear-cliente/crear-cliente.component.html'
})
export class EditarClienteComponent implements OnInit {

  _editando = true;
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

  ante: Antecedentes = {
    idantecedente: null,
    idpaciente: null,
    parabeletza: null,
    a_diabetes: null,
    a_gastritis: null,
    a_hipertension: null,
    a_ansiedad: null,
    a_operaciones: null,
    a_hormonales: null,
    a_cesarea: null,
    a_anticonceptivos: null,
    a_cigarro_alcohol: null,
    a_otros: null,
    creacion: null,
    modificacion: null,
  }

  tnrodni = this.controles._requerido();
  tapellidos = this.controles._requerido();
  tnombres = this.controles._requerido();
  tcelular = this.controles._requerido();

  listado_sexos = new ListasSistema().tipos_sexos;
  listado_opciones = new ListasSistema().tipos_booleanos;

  hay_antecedentes = false;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private controles: ControlesService,
    private fmysql: FmysqlService, private router: Router, private fclientes: FclientesService,
    private fusuario: FusuariosService, private cdref: ChangeDetectorRef) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);

    this.buscar_item();
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  buscar_item() {
    this.fmysql.buscar_id(environment.clientes._api, this._params.idsel).subscribe(res => {
      this.item = res.data[0];
      console.log('Buscar Item:', this.item);

      this.fmysql.buscar_campo(environment.historico.antecedentes, 'idpaciente', this._params.idsel).subscribe(res => {
        console.log('Antecedentes:', res);
        if (res.data.length == 0) {
          this.hay_antecedentes = false;
        } else {
          this.hay_antecedentes = true;
          this.ante = res.data[0];
        }
      })
    })
  }

  async guardar_cambios() {
    this.fusuario.get_usuario_logueado().then(ulogin => {
      this.item.idempleado = ulogin.idempleado;

      this.fclientes.modificar_cliente(this.item).then(res => {
        this.guardar_antecedentes();
      })
    })
  }

  guardar_antecedentes() {
    if (!this.hay_antecedentes) {
      this.fclientes.registrar_antecedentes(this._params.idsel, this.ante).then(res => {
        this.regresar_listado();
      })
    } else {
      this.fclientes.modificar_antecedentes(this.ante).then(res => {
        this.regresar_listado();
      })
    }
  }

  imagen_subida(imgup) {
    this.item.imagen = imgup.msg;
  }

  regresar_listado() {
    this.router.navigate(['dash/clientes', this.state.snapshot.params.params]);
  }

}
