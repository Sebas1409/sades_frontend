import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatoPaginacion } from 'src/app/interfaces/estructuras';
import { FmysqlService } from 'src/app/services/fmysql.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ListaFiltros } from 'src/app/services/listas-filtros';
import { environment } from 'src/environments/environment';
import { ExamenesService } from './examenes.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.scss']
})
export class ExamenesComponent implements OnInit,OnDestroy {

  listado_filtros = new ListaFiltros().filtros_matriculas;
  listado_datos = [];
  mifiltro: formatoPaginacion = null;
  public subscription: Subscription;

  constructor(private fmysql: FmysqlService,private router: Router,private funciones: FuncionesService,private fexamen:ExamenesService) { }

  ngOnInit(): void {
    this.subscription = this.fexamen.getExamenes().subscribe(res =>{
      if(res){
        this.listado_datos = res;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listar_datos(filtro: formatoPaginacion) {
    this.mifiltro = filtro;
    this.fmysql.enviar_post(environment.matriculas.paginado, filtro).subscribe(res => {
      console.log('Listado:', res);
      this.listado_datos = res.data;
    })
  }
  exportar_excel() { }

  entrar_a_item(editar: boolean, item?: any) {
    if (editar) {
      this.funciones.encripta(item.idevento).then(deco => {
        this.router.navigate(['/dash/eventos-examen/editar', deco[0]]);
      })
    } else {
      this.router.navigate(['/dash/eventos-examen/registro']);
    }
  }

  asginarExamen(item){
    this.router.navigate(['/dash/eventos-examen/asignacion']);
  }

}
