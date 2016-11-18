import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;

@Pipe({
  name: 'mtDate'
})
export class MtDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('dddd, D MMMM YYYY');
  }

}
