import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dietas } from 'src/app/interfaces/dietas';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-dietas',
  templateUrl: './form-dietas.component.html'
})

export class FormDietasComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Dietas = {
    iddieta: null,
    nombre: null,
    contenido: null,
    vigencia: null,
    creacion: null,
    modificacion: null
  }

  tnombre = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormDietasComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    if (this._edicion) {
      this._titulo = "Editar Marca";
      this.item = this.data.item;
    } else {
      this._titulo = "Registar nuevo Marca";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  texto_terminado(cadena) {
    console.log('Texto escrito:', cadena);
  }

  validar_accion() {
    if (this._edicion) {
      this.modificar_item();
    } else {
      this.registrar_item();
    }
  }

  registrar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoGuardar = {
      datos: [
        this.item.iddieta,
        this.item.nombre,
        this.item.contenido,
        1, 'now()', null
      ]
    };
    this.fmysql.registrar(environment.historico.dietas, datos).subscribe(res => {
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
      idcampo: { nombre: 'iddieta', valor: this.item.iddieta },
      campos: [
        'nombre',
        'contenido',
        'modificacion'
      ],
      valores: [
        this.item.nombre,
        this.item.contenido,
        'now()',
      ]
    };
    this.fmysql.modificar(environment.historico.dietas, datos).subscribe(res => {
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
