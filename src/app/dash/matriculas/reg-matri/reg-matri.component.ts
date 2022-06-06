import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatoGuardar, paramsURL } from 'src/app/interfaces/estructuras';
import { Matriculas } from 'src/app/interfaces/matriculas';
import { Servicios } from 'src/app/interfaces/servicios';
import { ControlesService } from 'src/app/services/controles.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FprecargadosService } from 'src/app/services/fprecargados.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { environment } from 'src/environments/environment';
import { addDays } from 'date-fns';
import { Clientes } from 'src/app/interfaces/clientes';
import { FormClienteComponent } from 'src/app/modales/form-cliente/form-cliente.component';
import { FclientesService } from 'src/app/services/fclientes.service';
import { FusuariosService } from 'src/app/services/fusuarios.service';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FormPagoMatriculaComponent } from 'src/app/modales/form-pago-matricula/form-pago-matricula.component';
import { FcajadineroService } from 'src/app/services/fcajadinero.service';
import { ListasSistema } from 'src/app/services/listas-sistema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reg-matri',
  templateUrl: './reg-matri.component.html'
})

export class RegMatriComponent implements OnInit,OnDestroy {

  _editando = false;
  _titulo_componente = 'Registrar Matrícula';

  _params: paramsURL = null;

  item: any = {
    idmatricula: null,
    anio_lectivo: 2022,
    tipo_pago: 1,
    idtipomatri: 1,
    idcaja: 1,
    fmatricula: this.funciones.get_fecha_local()._fecha_actual,
    nombre_completo:null,
    monto_matricula: null,
    monto_mensual: null,
    aula: 1,
    descripcion: null,
    vigencia: null,
    creacion: null,
    modificacion: null
  };

 cliente = {nrodni:null}


  listado_estados_matricula = [];


  testado = this.controles._requerido();
  tcliente = this.controles._requerido();
  tprecio = this.controles._requerido();
  tfinicio = this.controles._requerido();
  tanio = this.controles._requerido();
  ttipomatricula = this.controles._requerido();
  taula = this.controles._requerido();
  tpago = this.controles._requerido();

  public listado_tipos_matriculas: any[] = new ListasSistema().listado_tipo_matricula;
  public listado_anios_lectivos: any[] = new ListasSistema().listado_anios;
  public listado_tipo_pago: any[] = new ListasSistema().listado_tipo_pago;
  public listado_aula: any[] = new ListasSistema().listado_aula;
  public listado_cursos: any[] = new ListasSistema().listado_cursos;

  public reg_matri = [];
  private matri: Subscription;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private controles: ControlesService,
    private fmysql: FmysqlService, private router: Router, private fpre: FprecargadosService, private cdref: ChangeDetectorRef,
    private fcli: FclientesService, private fusu: FusuariosService, private fmatri: FmatriculasService,
    private fcaja: FcajadineroService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    this.getMatriculas()
    this.seleccionar_tipo()

    /*this.listado_estados_matricula = await this.fpre.listar_estados_matricula();

    if (this._params.idarea) {
      this.listar_servicios_xarea();
    } else {
      this.listar_servicios();
    }*/

  }
  public ngOnDestroy(): void {
    this.matri.unsubscribe();
  }

  getMatriculas(){
    this.matri = this.fmatri.getMatriculas().subscribe(res=>{
      console.log('subs',res)
      if(res){
        this.reg_matri = res;
      }
    })
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  seleccionar_tipo() {
    let tiposel = this.listado_tipos_matriculas.find(tipo => tipo.codigo == this.item.idtipomatri);
    this.item.monto_mensual = tiposel.monto_mensual;
    this.item.monto_matricula = tiposel.monto_matricula;
  }

  get_tipo_matricula() {
    this.fmysql.listar(environment.api_por_anios.tipos_de_matricula).subscribe(res => {
      if (res.ok && res.data.length != 0) {
        this.listado_tipos_matriculas = res.data;
      }
    });
  }

  async buscar_cliente(nrodni: string) {
    if (nrodni) {
      if (nrodni.length > 7) {
        /*this.fcli.buscar_cliente_xdni(nrodni).then(res => {
          if (res) {
            this.cliente = res;
            this.cliente.nombre_completo = this.cliente.nombres.toUpperCase() + ' ' + this.cliente.apellidos.toUpperCase();
          } else {
            this.registrar_cliente();
          }
        })*/
      } else {
        this.funciones.mostrar_snack('Ingrese un DNI correcto');
      }
    } else {
      this.funciones.mostrar_snack('Debe ingresar un DNI');
    }
  }

  async registrar_cliente() {
   /* this.funciones.mostrar_modal(FormClienteComponent, 50, {
      item: this.cliente.nrodni ? this.cliente.nrodni : null
    }, (idcliente) => {
      this.fcli.buscar_cliente_xid(idcliente).then(cliente => {
        console.log('Cliente Encontrado:', cliente);
        this.cliente = cliente;
        this.cliente.nombre_completo = this.cliente.nombres.toUpperCase() + ' ' + this.cliente.apellidos.toUpperCase();
      })
    })*/
  }

  async buscar_servicio(idservicio: number) {
   /* this.fmysql.buscar_id(environment.servicios._api, idservicio).subscribe(res => {
      this.servicio = res.data[0];
      console.log('Servicio:', this.servicio);
      this.item.precio_mat = this.servicio.precio_venta;
      this.fvencimiento = this.funciones.get_fecha_local(addDays(new Date(this.item.fmatricula), this.servicio.dias_vigencia))._fecha_actual;

      this.fcaja.verificar_caja_abierta(this.servicio.idsector).then(idcaja => {
        if (idcaja) {
          this.item.idcaja = idcaja;
          this.funciones.mostrar_snack('Caja Aperturada correctamente');
        } else {
          this.funciones.mostrar_snack('No hay caja aperturada en el sector');
        }
      })
    })*/
  }

 



  async guardar_cambios() {
    /* this.fusu.get_usuario_logueado().then(ulogin => {
       this.item.idempleado = ulogin.idempleado;
       this.item.idcliente = this.cliente.idcliente;
 
       this.fmatri.registrar_matricula(this.item).then(idmat => {
         this.funciones.mostrar_modal_confirmacion('Desea agregar pago?', () => {
           this.mostrar_modal_pago(idmat);
         }, () => {
           this.ir_a_editar(idmat);
         })
 
       })
     })*/
    
     this.postDataPrueba();
  }

  postDataPrueba(){
    let data = {
      tipo_matricula: this.listado_tipos_matriculas.find(ele=>ele.codigo == this.item.idtipomatri).nombre,
      fmatricula: this.item.fmatricula,
      monto_matricula: this.item.monto_matricula,
      monto_mensual: this.item.monto_mensual,
      curso: this.listado_cursos.find(ele=>ele.codigo == this.item.aula).nombre,
      alumno: this.item.nombre_completo
    }

   this.reg_matri.push(data)
   this.fmatri.postMatriculas(this.reg_matri);
   this.regresar_listado();
  }

  mostrar_modal_pago(idmat: number) {
    this.funciones.mostrar_modal(FormPagoMatriculaComponent, 40, {
      editar: false,
      item: null,
      params: {
        idmat: idmat,
        //idsec: this.servicio.idsector
      }
    }, () => {
      this.ir_a_editar(idmat);
    })
  }

  ir_a_editar(idmat: number) {
    this._params.idsel = idmat;
    this.funciones.encripta(this._params).then(deco => {
      this.router.navigate(['/dash/matriculas/editar/', deco]);
    })
  }

  regresar_listado() {
    this.router.navigate(['dash/matriculas', this.state.snapshot.params.params]);
  }

}
