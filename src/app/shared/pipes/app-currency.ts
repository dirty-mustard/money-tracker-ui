import { Pipe, PipeTransform } from '@angular/core';

import * as numeral from 'numeral';

@Pipe({name: 'appCurrency'})
export class AppCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return numeral(value).format('+0.00');
  }

}
