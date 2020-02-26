import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {

  transform1(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    return items.filter(singleItem =>
      singleItem[field].toLowerCase().includes(value.toLowerCase())
    );
  }

  transform(items: any[], keyword: any, properties: string[]): any[] {
    items.find(x => x.employee);


    if (!items) return [];
    if (!keyword) return items;
    debugger;
    return items.filter(item => {
      var itemFound: Boolean;
      for (let i = 0; i < properties.length; i++) {
        if (item.employee[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }

}
