import { Pipe, PipeTransform } from '@angular/core';

declare var numeral: any;

@Pipe({
  name: 'mtCurrency'
})
export class MtCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return numeral(value).format('+0.00');
  }

}
