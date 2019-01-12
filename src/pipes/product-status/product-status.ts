import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ProductStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'productStatus',
})
export class ProductStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(status) {
    if(status == 1){
      return "Đang phục vụ";
    }
    return "Ngừng phục vụ";
  }
}
