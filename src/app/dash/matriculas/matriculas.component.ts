import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatoPaginacion, paramsURL } from 'src/app/interfaces/estructuras';
import { FmatriculasService } from 'src/app/services/fmatriculas.service';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html'
})

export class MatriculasComponent implements OnInit {

  _params: paramsURL = null;

  listado_filtros = new ListaFiltros().filtros_matriculas;
  mifiltro: formatoPaginacion = null;

  listado_datos = [];
  private matri: Subscription;

  constructor(private funciones: FuncionesService, private state: ActivatedRoute, private router: Router,
    private fmysql: FmysqlService,private fmatri:FmatriculasService) { }

  async ngOnInit() {
    this._params = await this.funciones.parametros_url(this.state.snapshot.params.params);
    console.log('Parametros:', this._params);
    this.getMatriculas();
  }

  public ngOnDestroy(): void {
    this.matri.unsubscribe();
  }

  exportar_excel() { }

  getMatriculas(){
    this.matri = this.fmatri.getMatriculas().subscribe(res=>{
      console.log('subs',res)
      if(res){
        this.listado_datos = res;
      }
    })
  }

  listar_datos(filtro: formatoPaginacion) {
    this.mifiltro = filtro;
    this.fmysql.enviar_post(environment.matriculas.paginado, filtro).subscribe(res => {
      console.log('Listado:', res);
      this.listado_datos = res.data;
    })
  }

  entrar_a_item(editar: boolean, item?: any) {
    if (editar) {
      this._params.idsel = item.idmatricula;
      this.funciones.encripta(this._params).then(deco => {
        this.router.navigate(['/dash/matriculas/editar', deco]);
      })
    } else {
      this.router.navigate(['/dash/matriculas/registro', this.state.snapshot.params.params]);
    }
  }

  eliminar_item(idcliente) {
    /*this.fmysql.borrar(environment.matriculas._api, idcliente, () => {
      this.listar_datos(this.mifiltro);
    })*/
    this.listado_datos.splice(idcliente,1)
  }

}
