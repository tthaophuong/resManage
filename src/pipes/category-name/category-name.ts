import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the CategoryNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'categoryName',
})
export class CategoryNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(category_id) {
    let categorys = RestaurantManager.getInstance().getCategorys();
    for (const category of categorys) {
        if(category.getCategory_id() == category_id){
          return category.getName();
        }
    }
    return "";
  }
}
