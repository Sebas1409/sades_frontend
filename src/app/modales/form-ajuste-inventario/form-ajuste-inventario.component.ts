import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatoGuardar, formatoModificacion, paraModal } from 'src/app/interfaces/estructuras';
import { KardexProductos } from 'src/app/interfaces/kardex_productos';
import { Marca } from 'src/app/interfaces/marca';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FstockService } from 'src/app/services/fstock.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { FusuariosService } from 'src/app/services/fusuarios.service';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-ajuste-inventario',
  templateUrl: './form-ajuste-inventario.component.html'
})
export class FormAjusteInventarioComponent implements OnInit {

  _edicion = false;
  _guardando = false;
  _titulo = null;

  item: KardexProductos = {
    idkardexprod: null,
    idproducto: null,
    idempleado: null,
    idsector: null,
    idmotmovi: null,
    fecha_mov: this.funciones.get_fecha_local()._fecha_actual,
    esingreso: 1,
    cant_anterior: null,
    cant_mov: null,
    vigencia: null,
    creacion: null,

    idarea: null
  }

  ttipomov = this.controles._requerido();
  tproducto = this.controles._requerido();
  tarea = this.controles._requerido();
  tsector = this.controles._requerido();
  tmotivo = this.controles._requerido();
  tcantidad = this.controles._requerido();

  listado_tipos_movimiento = new ListasSistema().tipos_movimientos;
  listado_productos = [];
  listado_motivos = [];
  listado_areas = [];
  listado_sectores = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: paraModal, public dialogRef: MatDialogRef<FormAjusteInventarioComponent>,
    private cdref: ChangeDetectorRef, private fmysql: FmysqlService, private funciones: FuncionesService,
    private controles: ControlesService, private fstock: FstockService, private fpre: FprecargadosService,
    private fusuario: FusuariosService) { }

  async ngOnInit() {
    console.log('Parametros:', this.data);

    this._titulo = "Ajuste de Inventario";

    this.listado_areas = await this.fpre.listar_areas();
    this.filtrar_motivos(this.item.esingreso);

    if (this.data.params) {
      this.buscar_producto();
    } else {
      this.listar_productos();
    }
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  async filtrar_motivos(esingreso: number) {
    let motivos = await this.fpre.listar_motivos_kardex();
    this.listado_motivos = motivos.filter(mot => mot.esingreso == esingreso);
  }

  async buscar_stock_actual(idprod: number, idsector: number) {
    this.funciones.iniciar_loader();
    this.item.cant_anterior = await this.fstock.buscar_stock_xsector(idprod, idsector);
    this.funciones.terminar_loader();
    console.log('Stock: actual:', this.item.cant_anterior);
  }

  async buscar_sectores(idarea: number) {
    this.listado_sectores = [];
    this.item.idsector = null;
    this.listado_sectores = (await this.fpre.buscar_sectores(idarea)).filter(sec => sec.estienda == 1);
  }

  listar_productos() {
    this.fmysql.listar(environment.productos._api).subscribe(res => {
      this.listado_productos = res.data;
    })
  }

  buscar_producto() {
    this.fmysql.buscar_id(environment.productos._api, this.data.params).subscribe(res => {
      this.listado_productos = res.data;
      this.item.idproducto = this.data.params;
    })
  }

  async validar_accion() {
    this.item.idempleado = (await this.fusuario.get_usuario_logueado()).idempleado;
    this.registrar_item();
  }

  registrar_item() {
    this.funciones.iniciar_loader();
    let datos: formatoGuardar = {
      datos: [
        null,
        this.item.idproducto,
        this.item.idempleado,
        this.item.idsector,
        this.item.idmotmovi,
        this.item.fecha_mov,
        this.item.esingreso,
        this.item.cant_anterior,
        this.item.esingreso == 1 ? this.item.cant_mov : (this.item.cant_mov * -1),
        1, 'now()'
      ]
    };
    this.fmysql.registrar(environment.productos.kardex, datos).subscribe(res => {
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
