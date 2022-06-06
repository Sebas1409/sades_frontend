import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { paraModal } from 'src/app/interfaces/estructuras';
import { Matriculas } from 'src/app/interfaces/matriculas';
import { ControlesService } from 'src/app/services/controles.service';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-duplica-matri',
  templateUrl: './form-duplica-matri.component.html'
})

export class FormDuplicaMatriComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: Matriculas = {
    idmatricula: null,
    idservicio: null,
    idcliente: null,
    idempleado: null,
    idestadomat: null,
    fmatricula: this.funciones.get_fecha_local()._fecha_actual,
    precio_mat: null,
    diasextra: null,
    observaciones: null,
    vigencia: null,
    creacion: null,
    modificacion: null,
  }

  listado_areas = [];
  listado_cargos = [];
  listado_estados = new ListasSistema().estados_personal;

  tfecha = this.controles._requerido();

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormDuplicaMatriComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fpre: FprecargadosService, private fmat: FmatriculasService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);
    this._edicion = this.data.editar;

    this._titulo = "Duplicar Matricula";
    this.item = this.data.item;
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  validar_accion() {
    this._guardando = true;
    this.registrar_item();
  }

  async registrar_item() {
    this.item.idestadomat = 1;

    this.fmat.registrar_matricula(this.item).then(idmat => {
      this.cerrar_ventana(idmat);
    })
  }

  cerrar_ventana(respuesta: any) {
    this.dialogRef.close(respuesta);
  }

}
