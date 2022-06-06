import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTexto'
})
export class FiltroTextoPipe implements PipeTransform {

  transform(items: any[], campo: string, filter: any): any {
    if (!items || !filter || filter == 'null') {
      return items;
    } else {
      return items.filter(item => String(item[campo]).toLowerCase().indexOf(String(filter).toLowerCase()) !== -1);
    }
  }

}
