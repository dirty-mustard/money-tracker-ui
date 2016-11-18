import { Pipe, PipeTransform } from '@angular/core';

declare var _: any;

@Pipe({
  name: 'mtText'
})
export class MtTextPipe implements PipeTransform {

  transform(value: any, length: any): any {
    if (_.isString(value) && value.length > length) {
      return value.substring(0, length) + '...';
    }
    return value;
  }

}
