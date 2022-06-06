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
  selector: 'app-form-clave-empleado',
  templateUrl: './form-clave-empleado.component.html'
})

export class FormClaveEmpleadoComponent implements OnInit {

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

  tclave = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormClaveEmpleadoComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;
    this.item = this.data.item;
    this._titulo = "Modificar Clave";
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  validar_accion() {
    this._guardando = true;
    this.cambiar_clave();
  }

  cambiar_clave() {
    this.funciones.iniciar_loader();
    let datos = {

    };
    this.fmysql.enviar_post(environment.empleados.empleados + 'modclave/', this.item).subscribe(res => {
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
    this._guardando = false;
    this.dialogRef.close(respuesta);
  }

}
