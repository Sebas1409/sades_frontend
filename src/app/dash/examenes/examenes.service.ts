import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  public $examenes = new BehaviorSubject<any>(null);

  constructor() { }

  getExamenes(){
   return this.$examenes.asObservable();
  }

  postExamenes(item:any){
    this.$examenes.next(item);
   }
}
