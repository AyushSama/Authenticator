import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: any[], field: string): any[] {
    if (!value || !field) {
      return value;
    }
    return value.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }

}
