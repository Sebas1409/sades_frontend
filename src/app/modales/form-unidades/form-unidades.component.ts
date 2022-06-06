import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { Marca } from 'src/app/interfaces/marca';
import { Unidades } from 'src/app/interfaces/unidades';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-unidades',
  templateUrl: './form-unidades.component.html'
})
export class FormUnidadesComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Unidades = {
    idunidad: null,
    nombre: null,
    vigencia: null,
    creacion: null,
    modificacion: null,
  }

  tnombre = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormUnidadesComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    if (this._edicion) {
      this._titulo = "Editar Unidad";
      this.item = this.data.item;
    } else {
      this._titulo = "Registar Unidad";
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
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
        null,
        this.item.nombre,
        1, 'now()', null
      ]
    };
    this.fmysql.registrar(environment.productos.unidades, datos).subscribe(res => {
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
      idcampo: { nombre: 'idunidad', valor: this.item.idunidad },
      campos: [
        'nombre',
        'modificacion'
      ],
      valores: [
        this.item.nombre,
        'now()',
      ]
    };
    this.fmysql.modificar(environment.productos.unidades, datos).subscribe(res => {
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
