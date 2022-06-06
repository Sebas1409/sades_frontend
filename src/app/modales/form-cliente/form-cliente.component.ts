import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clientes } from 'src/app/interfaces/clientes';
import { paraModal } from 'src/app/interfaces/estructuras';
import { ControlesService } from 'src/app/services/controles.service';
import { FclientesService } from 'src/app/services/fclientes.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FusuariosService } from 'src/app/services/fusuarios.service';
import { ListasSistema } from 'src/app/services/listas-sistema';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html'
})

export class FormClienteComponent implements OnInit {

  _editando = false;
  _titulo_componente = 'Registrar Cliente';


  item: Clientes = {
    idcliente: null,
    idempleado: null,
    nrodni: null,
    apellidos: null,
    nombres: null,
    fnacimiento: '1990-02-27',
    celular: null,
    domicilio: null,
    sexo: 0,
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, private controles: ControlesService,
    private fclientes: FclientesService, private dlgref: MatDialogRef<FormClienteComponent>,
    private fusuario: FusuariosService, private cdref: ChangeDetectorRef, private funciones: FuncionesService) { }

  async ngOnInit() {
    if (this.data.item) {
      this.item.nrodni = this.data.item;
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  async guardar_cambios() {
    this.fclientes.buscar_cliente_xdni(this.item.nrodni).then(existe => {
      if (!existe) {
        this.fusuario.get_usuario_logueado().then(ulogin => {
          this.item.idempleado = ulogin.idempleado;

          this.fclientes.registrar_cliente(this.item).then(idcliente => {
            this.cerrar_ventana(idcliente);
          })
        })
      } else {
        this.funciones.mostrar_snack('El DNI ingresado ya existe');
      }
    })
  }

  cerrar_ventana(opt: any) {
    this.dlgref.close(opt);
  }

}
