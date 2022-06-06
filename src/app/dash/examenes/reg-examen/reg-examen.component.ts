import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamenesService } from '../examenes.service';

@Component({
  selector: 'app-reg-examen',
  templateUrl: './reg-examen.component.html',
  styleUrls: ['./reg-examen.component.scss']
})
export class RegExamenComponent implements OnInit,OnDestroy {
  _titulo_componente = 'Registrar Evento Examen';
  item = {
    idevento:null,
    nombre_evento: null,
    fecha_evento: null
  }
  listado_asignaciones = [];
  public subscription: Subscription;

  constructor(private fexamen:ExamenesService,private router:Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.fexamen.getExamenes().subscribe(res =>{
      if(res){
        this.listado_asignaciones = res;
      }
    })
  }

  registrarEvento() {
    this.item.idevento = this.listado_asignaciones.length + 1;
    this.listado_asignaciones.push(this.item);
    this.fexamen.postExamenes(this.listado_asignaciones);
    this.router.navigate(['/dash/eventos-examen']);
  }

}
