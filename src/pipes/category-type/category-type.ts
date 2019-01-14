import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CategoryTypePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'categoryType',
})
export class CategoryTypePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(type) {
    if(type == 1){
      return "Đồ ăn";
    }
    else if(type == 2){
      return "Đồ uống";
    }
    else{
      return "Chưa cập nhật";
    }
  }
}
