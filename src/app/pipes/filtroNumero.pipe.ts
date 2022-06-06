import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNumero'
})
export class FiltroNumeroPipe implements PipeTransform {

  transform(items: any[], campo: string, filter: any): any {
    if (!items || !filter || filter == 'null') {
      return items;
    } else {
      return items.filter(item => item[campo] == filter);
    }
  }

}
