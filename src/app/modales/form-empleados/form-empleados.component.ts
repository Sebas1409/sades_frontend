import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleados } from 'src/app/interfaces/empleados';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { Marca } from 'src/app/interfaces/marca';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html'
})

export class FormEmpleadosComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Empleados = {
    idempleado: null,
    idarea: null,
    idcargo: 1,
    nrodni: null,
    apellidos: null,
    nombres: null,
    clave: null,
    estado: 1,
    vigencia: null,
    creacion: null,
    modificacion: null,
  }

  listado_areas = [];
  listado_cargos = [];
  listado_estados = new ListasSistema().estados_personal;

  tapellido = this.controles._requerido();
  tnombre = this.controles._requerido();
  tarea = this.controles._requerido();
  tcargo = this.controles._requerido();
  testado = this.controles._requerido();
  tnrodni = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormEmpleadosComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    this.listado_areas = await this.fpre.listar_areas();
    this.listado_cargos = await this.fpre.listar_cargos();

    if (this._edicion) {
      this._titulo = "Editar Empleados";
      this.item = this.data.item;
    } else {
      this._titulo = "Registar nuevo Empleados";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  validar_accion() {
    this._guardando = true;
    if (this._edicion) {
      this.modificar_item();
    } else {
      this.registrar_item();
    }
  }

  registrar_item() {
    this.funciones.iniciar_loader();
    this.fmysql.enviar_post(environment.empleados.empleados + 'guardar/', this.item).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.cerrar_ventana(true);
      } else {
        this.cerrar_ventana(true);
      }
    })
  }

  modificar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoModificacion = {
      idcampo: { nombre: 'idempleado', valor: this.item.idempleado },
      campos: [
        'idarea',
        'idcargo',
        'nrodni',
        'apellidos',
        'nombres',
        'estado',
      ],
      valores: [
        this.item.idarea,
        this.item.idcargo,
        this.item.nrodni,
        this.item.apellidos,
        this.item.nombres,
        this.item.estado,
        'now()',
      ]
    };
    this.fmysql.modificar(environment.empleados.empleados, datos).subscribe(res => {
      console.log('Respues de API:', res);
      this.funciones.terminar_loader();
      if (res.ok) {
        this.cerrar_ventana(true);
      } else {
        this.cerrar_ventana(true);
      }
    })
  }

  cerrar_ventana(respuesta: any) {
    this.dialogRef.close(respuesta);
  }

}
