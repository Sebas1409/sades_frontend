import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rellenar'
})
export class RellenarPipe implements PipeTransform {

  transform(value: any, len: number): any {
    let minumero = String(value);
    while (minumero.length < len) {
      minumero = '0' + minumero;
    }
    return minumero;
  }

}
