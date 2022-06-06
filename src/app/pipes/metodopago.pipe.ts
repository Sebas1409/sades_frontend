import { Pipe, PipeTransform } from '@angular/core';
import { ListasSistema } from '../services/listas-sistema';

@Pipe({
  name: 'metodopago'
})
export class MetodopagoPipe implements PipeTransform {

  transform(metpago: number): string {
    let metodos = new ListasSistema().metodos_pago;
    return metodos.find(met => met.codigo == metpago).nombre;
  }

}
