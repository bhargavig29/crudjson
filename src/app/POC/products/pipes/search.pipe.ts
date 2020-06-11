import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})
export class SearchPipe implements PipeTransform {
  
// transform(items: any[], searchText: string, fieldName: string): any[] {

//     // return empty array if array is falsy
//     if (!items) { return []; }

//     // return the original array if search text is empty
//     if (!searchText) { return items; }

//     // convert the searchText to lower case
//     searchText = searchText.toLowerCase();

//     // retrun the filtered array
//     return items.filter(item => {
//       if (item && item[fieldName]) {
//         return item[fieldName].toLowerCase().includes(searchText);
//       }
//       return false;
//     });
//    }
public transform(value, keys: string, term: string) {

  if (!term) return value;
  return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

}
}

